import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "@clio/auth/cookies";
import { minimatch } from "minimatch";

const publicPaths = ["/"];

export async function proxy(req: NextRequest) {
  const url = new URL(req.url);

  const pathname = url.pathname;
  const isPublic = publicPaths.some((pattern) =>
    minimatch(pathname, pattern, { nocase: true }),
  );

  if (isPublic) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(req);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/",
  ],
};
