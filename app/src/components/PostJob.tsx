'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

export default function PostJob() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    payRate: '',
    requirements: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    setIsLoading(true);
    try {
      // In a real implementation, this would call the smart contract
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Job posted:', formData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        payRate: '',
        requirements: '',
        location: '',
      });
      setShowForm(false);
      alert('Job posted successfully! 🎉');
    } catch (error) {
      console.error('Failed to post job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!showForm) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Post a New Job</h3>
          <p className="text-gray-600 mb-6">
            Connect with motivated students and find the perfect help for your business!
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            ➕ Create Job Posting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Create Job Posting</h3>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕ Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., Coffee Shop Assistant, Social Media Helper"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Describe the role, responsibilities, and what makes it great for students..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pay Rate (SOL per hour) *
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              required
              value={formData.payRate}
              onChange={(e) => setFormData({ ...formData, payRate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0.5"
            />
            {formData.payRate && (
              <p className="text-sm text-gray-500 mt-1">
                ≈ ${(parseFloat(formData.payRate) * 200).toFixed(0)} per hour
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Near Stanford Campus"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirements & Skills
          </label>
          <textarea
            rows={3}
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="List any specific requirements, skills, or qualities you're looking for (one per line)"
          />
          <p className="text-sm text-gray-500 mt-1">
            Tip: Be student-friendly! Consider mentioning flexible hours or learning opportunities.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">💡 Tips for Success:</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Mention if the schedule is flexible around classes</li>
            <li>• Highlight learning opportunities and skill building</li>
            <li>• Be clear about expectations and work environment</li>
            <li>• Consider offering performance bonuses in SOL</li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            {isLoading ? '🔄 Posting Job...' : '🚀 Post Job'}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
