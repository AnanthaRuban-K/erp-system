'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ApiResponse {
  [key: string]: any;
}

export default function ApiTestPage() {
  const [responses, setResponses] = useState<Record<string, ApiResponse>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const testEndpoint = async (name: string, endpoint: string) => {
    setLoading(name);
    try {
      const response = await fetch(`http://localhost:3001${endpoint}`);
      const data = await response.json();
      setResponses(prev => ({ ...prev, [name]: { ...data, status: response.status } }));
    } catch (error) {
      setResponses(prev => ({ 
        ...prev, 
        [name]: { error: 'Failed to connect to backend', details: String(error) }
      }));
    } finally {
      setLoading(null);
    }
  };

  const endpoints = [
    { name: 'Backend Status', endpoint: '/', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Health Check', endpoint: '/api/health', color: 'bg-green-600 hover:bg-green-700' },
    { name: 'Employees', endpoint: '/api/employees', color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'Finance Summary', endpoint: '/api/finance/summary', color: 'bg-yellow-600 hover:bg-yellow-700' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔗 ERP API Testing Center
          </h1>
          <p className="text-gray-600">
            Test your ERP backend endpoints and verify connectivity.
          </p>
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {endpoints.map(({ name, endpoint, color }) => (
  <button
    key={name}
    type="button"
    onClick={() => testEndpoint(name, endpoint)}
    disabled={loading === name}
    className={`p-4 rounded-lg text-white font-semibold transition-colors ${color}
      ${loading === name ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {loading === name ? 'Testing...' : `Test ${name}`}
  </button>
))}
        </div>

        {/* Test All Button */}
        <div className="mb-8 text-center">
  <button
    type="button"
    onClick={() => endpoints.forEach(({ name, endpoint }) => testEndpoint(name, endpoint))}
    disabled={loading !== null}
    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
  >
    🚀 Test All Endpoints
  </button>
        </div>

        {/* Responses */}
        <div className="space-y-6">
          {Object.entries(responses).map(([name, response]) => (
            <div key={name} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center">
                {name} Response
                {response.status && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded ${
                    response.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {response.status}
                  </span>
                )}
              </h3>
              <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                <pre className="text-sm text-gray-800">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center space-x-4">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Home
          </Link>
          <Link 
            href="/sign-in"
            className="text-green-600 hover:text-green-800 underline"
          >
            Try Authentication →
          </Link>
        </div>
      </div>
    </div>
  );
}