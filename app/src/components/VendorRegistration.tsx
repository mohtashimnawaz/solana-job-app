'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';

interface VendorRegistrationProps {
  onRegistered: () => void;
}

export default function VendorRegistration({ onRegistered }: VendorRegistrationProps) {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  
  const [formData, setFormData] = useState({
    businessName: '',
    location: '',
    description: '',
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

      console.log('Vendor registered:', formData);
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
        <div className="text-6xl mb-4">🏪</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Vendor Registration</h3>
        <p className="text-gray-600">
          Connect with motivated students for your business needs!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            required
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your business name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., Downtown Palo Alto, Near Stanford Campus"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Description
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Brief description of your business and what kind of help you need"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
        >
          {isLoading ? '🔄 Registering...' : '✅ Complete Registration'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-900 mb-2">What you can do:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Post part-time job opportunities</li>
          <li>• Review student applications and profiles</li>
          <li>• Set flexible work schedules that work for students</li>
          <li>• Pay students directly in SOL cryptocurrency</li>
        </ul>
      </div>
    </div>
  );
}
