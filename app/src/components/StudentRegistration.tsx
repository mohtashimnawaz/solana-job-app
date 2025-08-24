'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';

interface StudentRegistrationProps {
  onRegistered: () => void;
}

export default function StudentRegistration({ onRegistered }: StudentRegistrationProps) {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    studyField: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey || !signTransaction) return;

    setIsLoading(true);
    try {
      // Create provider
      const provider = new AnchorProvider(
        connection,
        { publicKey, signTransaction } as any,
        { commitment: 'confirmed' }
      );
      setProvider(provider);

      // For now, just simulate registration
      // In a real implementation, you'd call the smart contract here
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Student registered:', formData);
      onRegistered();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">🎓</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Student Registration</h3>
        <p className="text-gray-600">
          Tell us about yourself to find the perfect part-time jobs!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            College/University
          </label>
          <input
            type="text"
            required
            value={formData.college}
            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Stanford University, MIT, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field of Study
          </label>
          <input
            type="text"
            required
            value={formData.studyField}
            onChange={(e) => setFormData({ ...formData, studyField: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Computer Science, Business, Engineering, etc."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
        >
          {isLoading ? '🔄 Registering...' : '✅ Complete Registration'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Browse available part-time jobs from local vendors</li>
          <li>• Apply to jobs that fit your schedule</li>
          <li>• Get notified when vendors review your application</li>
          <li>• Start earning SOL while building experience!</li>
        </ul>
      </div>
    </div>
  );
}
