"use client";

import { useEffect, useMemo, useState } from "react";
import { geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land110m from "world-atlas/land-110m.json";

import { cn } from "@/lib/utils";
import type { GlobeLocation, Locale } from "@/lib/site";

type OrbitGlobeProps = {
  locations: GlobeLocation[];
  locale: Locale;
  detailed?: boolean;
  className?: string;
  variant?: "hero" | "panel";
};

const land = feature(
  land110m as never,
  (land110m as { objects: { land: unknown } }).objects.land as never,
);
const graticule = geoGraticule10();
const routePairs = [
  ["montreal", "new-york"],
  ["new-york", "frankfurt"],
  ["frankfurt", "tokyo"],
  ["tokyo", "shanghai"],
  ["tokyo","taipei"],
  ["shanghai", "hong-kong"],
  ["hong-kong", "taipei"],
] as const;

function buildArcPath(
  projection: ReturnType<typeof geoOrthographic>,
  source: [number, number],
  target: [number, number],
) {
  const interpolate = geoInterpolate(source, target);
  const points: [number, number][] = [];

  for (let i = 0; i <= 30; i += 1) {
    const projected = projection(interpolate(i / 30));
    if (projected) {
      points.push(projected as [number, number]);
    }
  }

  if (points.length < 2) {
    return null;
  }

  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
}

export function OrbitGlobe({
  locations,
  locale,
  detailed = false,
  className,
  variant = "panel",
}: OrbitGlobeProps) {
  const isHero = variant === "hero";
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      // Low-frequency updates keep the globe smooth enough visually while
      // avoiding expensive full reprojection work on every animation frame.
      setRotation((current) => (current + 0.025) % 360);
    }, 60);

    return () => window.clearInterval(intervalId);
  }, []);

  const { graticulePath, landPath, projectedLocations, routes } = useMemo(() => {
    const projection = geoOrthographic()
      .translate([320, 320])
      .scale(isHero ? 214 : detailed ? 206 : 198)
      .rotate([-118 + rotation, -24, 0])
      .clipAngle(90)
      .precision(0.2);
    const path = geoPath(projection);
    const locationsBySlug = new Map(
      locations.map((location) => [location.slug, location] as const),
    );

    const routePaths = routePairs
      .map(([sourceSlug, targetSlug]) => {
        const source = locationsBySlug.get(sourceSlug);
        const target = locationsBySlug.get(targetSlug);
        if (!source || !target) {
          return null;
        }

        return buildArcPath(projection, source.coordinates, target.coordinates);
      })
      .filter((route): route is string => Boolean(route));

    const points = locations
      .map((location) => {
        const projected = projection(location.coordinates);
        if (!projected) {
          return null;
        }

        return {
          location,
          point: projected as [number, number],
        };
      })
      .filter(
        (
          item,
        ): item is { location: GlobeLocation; point: [number, number] } =>
          Boolean(item),
      );

    return {
      graticulePath: path(graticule),
      landPath: path(land),
      projectedLocations: points,
      routes: routePaths,
    };
  }, [detailed, isHero, locations, rotation]);

  const outline = isHero ? "rgba(255,255,255,0.82)" : "rgba(226,242,248,0.82)";
  const secondary = isHero ? "rgba(255,255,255,0.2)" : "rgba(198,247,251,0.24)";
  const tertiary = isHero ? "rgba(255,255,255,0.12)" : "rgba(198,247,251,0.14)";
  const routeColor = isHero ? "rgba(255,255,255,0.22)" : "rgba(198,247,251,0.3)";
  const markerColor = isHero ? "rgba(255,255,255,0.94)" : "rgba(239,251,252,0.94)";
  const labelText = isHero ? "rgba(255,255,255,0.94)" : "rgba(235,251,252,0.96)";
  const showLabels = !isHero;
  const showCards = !isHero && !detailed;

  return (
    <div className={cn("relative isolate flex flex-col gap-6", className)}>
      <div
        className={cn(
          "relative mx-auto aspect-square w-full",
          isHero ? "max-w-none" : detailed ? "max-w-[560px]" : "max-w-[500px]",
        )}
      >
        <svg
          viewBox="0 0 640 640"
          className="absolute inset-0 h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="320" cy="320" r="198" stroke={outline} strokeWidth="1.7" />
          <circle
            cx="320"
            cy="320"
            r="220"
            stroke={tertiary}
            strokeWidth="1"
            strokeDasharray="7 14"
          />
          {graticulePath ? (
            <path d={graticulePath} stroke={tertiary} strokeWidth="0.9" opacity="0.9" />
          ) : null}
          {landPath ? (
            <path
              d={landPath}
              stroke={outline}
              strokeWidth={isHero ? "1.35" : "1.5"}
              fill="none"
            />
          ) : null}
          <ellipse cx="320" cy="320" rx="252" ry="108" stroke={secondary} strokeWidth="0.9" />
          <ellipse cx="320" cy="320" rx="145" ry="260" stroke={secondary} strokeWidth="0.9" />

          {routes.map((route) => (
            <path
              key={route}
              d={route}
              stroke={routeColor}
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
          ))}

          {projectedLocations.map(({ location, point }) => {
            const [x, y] = point;
            const [dx, dy] = location.labelOffset;
            const labelX = x + dx;
            const labelY = y + dy;
            const elbowX = x + dx * 0.74;
            const elbowY = y + dy * 0.74;

            return (
              <g key={location.slug}>
                {showLabels ? (
                  <path
                    d={`M${x.toFixed(1)} ${y.toFixed(1)} L${elbowX.toFixed(1)} ${elbowY.toFixed(1)}`}
                    stroke={secondary}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                ) : null}
                <circle cx={x} cy={y} r="3.1" fill={markerColor} />
                <circle cx={x} cy={y} r="9.2" stroke={secondary} strokeWidth="0.9" />
                {showLabels ? (
                  <>
                    <rect
                      x={labelX}
                      y={labelY - 16}
                      width={detailed ? 122 : 104}
                      height={detailed ? 34 : 30}
                      rx="15"
                      fill="rgba(6,16,31,0.76)"
                      stroke={secondary}
                    />
                    <text
                      x={labelX + 12}
                      y={labelY + 3}
                      fill={labelText}
                      fontSize={detailed ? 13 : 12}
                      fontWeight="600"
                      fontFamily="var(--font-space-grotesk), var(--font-noto-sans-sc), sans-serif"
                    >
                      {location.labels[locale]}
                    </text>
                  </>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      {showCards ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {locations.slice(0, 4).map((location) => (
            <div
              key={location.slug}
              className="rounded-[1.35rem] border border-white/12 bg-black/12 px-4 py-4"
            >
              <div className="text-sm font-semibold text-white">
                {location.labels[locale]}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-100/60">
                {location.meta[locale]}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
