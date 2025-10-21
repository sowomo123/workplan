import { withAuth } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    // Get user information first to ensure they're authenticated
    const { user } = await withAuth({ ensureSignedIn: true });
    
    // Log user info for debugging (remove in production)
    console.log('Dashboard access by user:', {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    });
    
    // Redirect to the protected page which serves as the main dashboard
    redirect('/protected');
}