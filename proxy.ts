import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isLocale } from "@/lib/site";
import { detectLocaleFromRequest, isPublicAssetPath } from "@/middleware-utils";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAssetPath(pathname)) {
    return NextResponse.next();
  }

  const localeInPath = pathname.split("/").filter(Boolean)[0];

  if (isLocale(localeInPath)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", localeInPath);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    if (request.cookies.get("NEXT_LOCALE")?.value !== localeInPath) {
      response.cookies.set("NEXT_LOCALE", localeInPath, {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  }

  const locale = detectLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });
  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
