'use client';

import { useState } from 'react';

export default function Home() {
  const [userType, setUserType] = useState<'student' | 'vendor' | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                🎓 Campus Connect
              </h1>
              <p className="ml-4 text-lg text-gray-600">Find Part-Time Jobs Near You</p>
            </div>
            <div className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
              Connect Wallet
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!userType && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to Campus Connect! 👋
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Connect students with local vendors for amazing part-time job opportunities. 
              Build your experience while earning money during your studies!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Student Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer"
                   onClick={() => setUserType('student')}>
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Student</h3>
                <p className="text-gray-600 mb-6">
                  Looking for part-time jobs that fit around your class schedule? 
                  Find flexible opportunities with local vendors!
                </p>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>✅ Flexible hours around classes</li>
                  <li>✅ Build real-world experience</li>
                  <li>✅ Earn money while studying</li>
                  <li>✅ Connect with local businesses</li>
                </ul>
              </div>

              {/* Vendor Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-transparent hover:border-green-500 transition-all cursor-pointer"
                   onClick={() => setUserType('vendor')}>
                <div className="text-6xl mb-4">🏪</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm a Local Vendor</h3>
                <p className="text-gray-600 mb-6">
                  Need reliable, motivated students for part-time work? 
                  Post jobs and connect with local talent!
                </p>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>✅ Access to motivated students</li>
                  <li>✅ Flexible workforce solutions</li>
                  <li>✅ Support local education</li>
                  <li>✅ Easy job posting system</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {userType && !isRegistered && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {userType === 'student' ? 'Student Registration' : 'Vendor Registration'}
              </h3>
              <p className="text-gray-600 mb-6">
                Connect your wallet and register to get started!
              </p>
              <button
                onClick={() => setIsRegistered(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold"
              >
                Register as {userType === 'student' ? 'Student' : 'Vendor'}
              </button>
            </div>
            <button
              onClick={() => setUserType(null)}
              className="mt-4 text-indigo-600 hover:text-indigo-800"
            >
              ← Back to selection
            </button>
          </div>
        )}

        {userType && isRegistered && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {userType === 'student' ? '🎓 Student Dashboard' : '🏪 Vendor Dashboard'}
              </h2>
              <button
                onClick={() => {
                  setUserType(null);
                  setIsRegistered(false);
                }}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                Switch User Type
              </button>
            </div>

            {userType === 'vendor' && (
              <div className="mb-8 bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Post a New Job</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Job Description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Pay Rate (SOL per hour)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold">
                    Post Job
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {userType === 'student' ? 'Available Jobs' : 'Your Posted Jobs'}
              </h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Coffee Shop Assistant</h4>
                  <p className="text-gray-600 mb-4">Help with serving customers and maintaining a clean environment. Perfect for students!</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-semibold">0.5 SOL/hour</span>
                    {userType === 'student' ? (
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Apply Now
                      </button>
                    ) : (
                      <span className="text-gray-500">2 applications</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
