'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface Job {
  id: string;
  title: string;
  description: string;
  payRate: number;
  vendor: string;
  location: string;
  requirements: string[];
  isOpen: boolean;
}

interface JobBoardProps {
  userType: 'student' | 'vendor';
}

export default function JobBoard({ userType }: JobBoardProps) {
  const { publicKey } = useWallet();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Coffee Shop Assistant',
        description: 'Help with serving customers, preparing drinks, and maintaining a clean environment. Perfect for students with flexible scheduling!',
        payRate: 0.5,
        vendor: 'Campus Cafe',
        location: 'Near Stanford Campus',
        requirements: ['Friendly personality', 'Available weekends', 'No experience required'],
        isOpen: true,
      },
      {
        id: '2',
        title: 'Tutoring Assistant',
        description: 'Help elementary students with homework and basic math concepts. Great for education majors!',
        payRate: 0.8,
        vendor: 'Learning Center',
        location: 'Palo Alto',
        requirements: ['Good with kids', 'Strong in math', 'Patient and encouraging'],
        isOpen: true,
      },
      {
        id: '3',
        title: 'Social Media Helper',
        description: 'Create content and manage social media for local restaurant. Perfect for marketing students!',
        payRate: 0.6,
        vendor: 'Taste of Italy',
        location: 'Downtown Palo Alto',
        requirements: ['Social media savvy', 'Creative', 'Available evenings'],
        isOpen: true,
      },
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApply = async (jobId: string) => {
    // In a real implementation, this would call the smart contract
    console.log('Applying to job:', jobId);
    alert('Application submitted! 🎉');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {userType === 'student' ? '💼 Available Jobs' : '📋 Your Posted Jobs'}
        </h3>
        <div className="text-sm text-gray-500">
          {jobs.length} job{jobs.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {userType === 'student' ? 'No jobs available right now' : 'No jobs posted yet'}
          </h4>
          <p className="text-gray-600">
            {userType === 'student' 
              ? 'Check back soon for new opportunities!' 
              : 'Start by posting your first job opportunity.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h4>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span className="flex items-center">
                      🏪 {job.vendor}
                    </span>
                    <span className="flex items-center">
                      📍 {job.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {job.payRate} SOL/hour
                  </div>
                  <div className="text-sm text-gray-500">
                    ≈ ${(job.payRate * 200).toFixed(0)}/hour
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="mb-4">
                <h5 className="font-medium text-gray-900 mb-2">Requirements:</h5>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${job.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-gray-600">
                    {job.isOpen ? 'Accepting applications' : 'Position filled'}
                  </span>
                </div>

                {userType === 'student' ? (
                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={!job.isOpen}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    {job.isOpen ? '🚀 Apply Now' : 'Position Filled'}
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                      3 applications
                    </span>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                      View Applications
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
