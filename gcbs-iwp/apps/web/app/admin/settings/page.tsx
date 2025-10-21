import { withAuth } from "@workos-inc/authkit-nextjs";
import { AdminSettings } from "@/components/admin/admin-settings";

export default async function SettingsPage() {
    const { user } = await withAuth({ ensureSignedIn: true });

    return <AdminSettings user={user} />;
}