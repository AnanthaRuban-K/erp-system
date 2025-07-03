import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🏢 ERP System
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive Enterprise Resource Planning System for HR and Finance Management
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Human Resources</h3>
              <p className="text-gray-600">Employee management, payroll, attendance tracking</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-green-600 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Finance</h3>
              <p className="text-gray-600">Accounting, budgets, invoicing, financial reports</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-purple-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">Business intelligence and comprehensive reporting</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-orange-600 text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">API Testing</h3>
              <p className="text-gray-600">Test backend connections and API endpoints</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-red-600 text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Administration</h3>
              <p className="text-gray-600">System settings and user management</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Reports</h3>
              <p className="text-gray-600">Comprehensive business reports and analytics</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <Link
              href="/api-test"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              🔗 Test API Connection
            </Link>
            <Link
              href="/sign-in"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              🔐 Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              👤 Create Account
            </Link>
          </div>

          {/* Backend Status */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-3">🚀 Quick Status Check</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Frontend:</strong> ✅ Running on http://localhost:3000</p>
              <p><strong>Backend:</strong> ✅ Running on http://localhost:3001</p>
              <p><strong>Authentication:</strong> 🔐 Clerk integration ready</p>
              <p><strong>Database:</strong> 🗄️ Ready for connection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}