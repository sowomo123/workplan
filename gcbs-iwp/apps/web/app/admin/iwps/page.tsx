import { withAuth } from "@workos-inc/authkit-nextjs";
import { IWPManagement } from "@/components/admin/iwp-management";

export default async function IWPsPage() {
    const { user } = await withAuth({ ensureSignedIn: true });

    return <IWPManagement user={user} />;
}