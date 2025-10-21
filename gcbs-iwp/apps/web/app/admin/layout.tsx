import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Ensure user is signed in
    const { user } = await withAuth({ ensureSignedIn: true });

    // In a real application, you would check if the user has admin privileges
    // For now, we'll allow all authenticated users to access admin
    // You should implement proper role-based access control here

    return (
        <div className="admin-layout">
            {children}
        </div>
    );
}