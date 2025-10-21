import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

// Prefer an explicit WORKOS redirect URI. Fall back to common site env vars if present.
const redirectUri = process.env.WORKOS_REDIRECT_URI ?? process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL;

if (!redirectUri) {
    // Provide a clear error so developers know what to set when running locally or in CI.
    throw new Error(
        "Missing WORKOS_REDIRECT_URI environment variable. Please set WORKOS_REDIRECT_URI (e.g. http://localhost:3000/callback) or NEXT_PUBLIC_SITE_URL / NEXTAUTH_URL."
    );
}

// Only pass supported options to authkitMiddleware. `postLogoutRedirectUri` is not part of the
// AuthkitMiddlewareOptions type for this version of the package, so omit it to satisfy TS.
export default authkitMiddleware({ redirectUri });

// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
export const config = { matcher: ["/protected", "/home-page", "/admin/:path*"] };
