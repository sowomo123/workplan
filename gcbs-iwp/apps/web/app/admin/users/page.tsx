import { withAuth } from "@workos-inc/authkit-nextjs";
import { UserManagement } from "@/components/admin/user-management";

export default async function UsersPage() {
    const { user } = await withAuth({ ensureSignedIn: true });

    return <UserManagement user={user} />;
}