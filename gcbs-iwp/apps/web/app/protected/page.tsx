import { withAuth } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default async function ProtectedPage() {
  // If the user isn't signed in, they will be automatically redirected to AuthKit
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to IWP Management System
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome back{user.firstName && `, ${user.firstName}`}!
          </p>

          <div className="space-y-4">
            <Link href="/admin" className="block">
              <Button className="w-full" size="lg">
                Access Admin Dashboard
              </Button>
            </Link>

            <div className="text-sm text-gray-500">
              <p>Email: {user.email}</p>
              <p>User ID: {user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
