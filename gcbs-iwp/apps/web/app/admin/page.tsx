import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
    // Ensure user is signed in
    const { user } = await withAuth({ ensureSignedIn: true });

    // Check if user has admin role
    // Note: You'll need to implement proper role checking based on your user model
    // For now, we'll allow access to all authenticated users
    // In production, you should check user.role === 'ADMIN' or similar

    return <AdminDashboard user={user} />;
}