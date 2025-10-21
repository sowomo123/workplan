import { handleAuth } from '@workos-inc/authkit-nextjs';

// Redirect the user to `/admin` after successful sign in
// The redirect can be customized further if needed
export const GET = handleAuth({ returnPathname: '/admin' });
