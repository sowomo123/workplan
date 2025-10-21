import { withAuth } from '@workos-inc/authkit-nextjs';
import { PerformanceAssessment } from '@/components/admin/performance-assessment';

export default async function PerformanceAssessmentPage() {
    const { user } = await withAuth({ ensureSignedIn: true });

    return <PerformanceAssessment user={user} />;
}