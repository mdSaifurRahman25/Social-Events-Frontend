import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

// Redirects logged-out visitors away from private pages.
// The event details page (/events/<id>) is intentionally public, so it is not listed here.
export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session?.user) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/events/create",
        "/events/manage",
        "/events/joined",
        "/events/:id/edit",
        "/profile",
    ],
};