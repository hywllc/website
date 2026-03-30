import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  detectPreferredLocale,
  isBotRequest,
  isPublicAssetPath,
} from "@/middleware-utils";

function withLocaleHeader(response: NextResponse, locale: "en" | "zh") {
  response.headers.set("x-locale", locale);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAssetPath(pathname)) {
    return NextResponse.next();
  }

  const isZhPage = pathname === "/zh" || pathname.startsWith("/zh/");
  const preferredLocale = detectPreferredLocale(request);

  if (!isBotRequest(request)) {
    if ((pathname === "/" || pathname === "/partners") && preferredLocale === "zh") {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/partners" ? "/zh/partners" : "/zh";
      const response = NextResponse.redirect(url);
      response.cookies.set("NEXT_LOCALE", "zh", {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        path: "/",
      });
      return withLocaleHeader(response, "zh");
    }

    if (isZhPage && preferredLocale === "en") {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/zh/partners" ? "/partners" : "/";
      const response = NextResponse.redirect(url);
      response.cookies.set("NEXT_LOCALE", "en", {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        path: "/",
      });
      return withLocaleHeader(response, "en");
    }
  }

  const locale = isZhPage ? "zh" : "en";
  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });
  return withLocaleHeader(response, locale);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
