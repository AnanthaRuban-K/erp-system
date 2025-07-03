import { currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Get user role from metadata (you'll set this up later)
  const userRole = user.publicMetadata?.role as string || 'employee';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🏢 ERP Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
              </span>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10'
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* User Info Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Information
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 space-y-1">
                <p><strong>Email:</strong> {user.emailAddresses[0].emailAddress}</p>
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Role:</strong> <span className="capitalize">{userRole.replace('_', ' ')}</span></p>
                <p><strong>User ID:</strong> {user.id}</p>
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* HR Module */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="text-3xl">👥</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Human Resources
                    </h3>
                    <p className="text-sm text-gray-500">
                      Employee management & payroll
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/hr"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Access HR Module
                  </Link>
                </div>
              </div>
            </div>

            {/* Finance Module */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="text-3xl">💰</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Finance
                    </h3>
                    <p className="text-sm text-gray-500">
                      Accounting & financial reports
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/finance"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Access Finance Module
                  </Link>
                </div>
              </div>
            </div>

            {/* API Test */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="text-3xl">🔗</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      API Test
                    </h3>
                    <p className="text-sm text-gray-500">
                      Test backend connection
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/api-test"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                  >
                    Test API
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}