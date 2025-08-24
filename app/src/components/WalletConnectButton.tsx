'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

export default function WalletConnectButton() {
  const { connected, connecting, publicKey, disconnect, wallet, connect } = useWallet();
  const { setVisible } = useWalletModal();
  const [isClient, setIsClient] = useState(false);
  const [connectionTimeout, setConnectionTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-connect when wallet is selected with timeout
  useEffect(() => {
    if (wallet && !connected && !connecting) {
      console.log('Attempting to connect to wallet:', wallet.adapter.name);
      
      // Set a timeout for connection attempt
      const timeout = setTimeout(() => {
        console.error('Connection timeout - wallet took too long to respond');
        alert('Connection timeout. Please make sure Phantom wallet is installed and unlocked, then try again.');
      }, 10000); // 10 second timeout
      
      setConnectionTimeout(timeout);
      
      connect().then(() => {
        console.log('Wallet connected successfully');
        if (timeout) clearTimeout(timeout);
        setConnectionTimeout(null);
      }).catch((error) => {
        console.error('Failed to connect wallet:', error);
        if (timeout) clearTimeout(timeout);
        setConnectionTimeout(null);
        
        // More specific error handling
        if (error.message?.includes('User rejected')) {
          alert('Connection cancelled. Please try again and approve the connection in Phantom.');
        } else if (error.message?.includes('not found') || error.message?.includes('No provider')) {
          alert('Phantom wallet not detected. Please install Phantom from https://phantom.app/ and refresh the page.');
        } else if (error.message?.includes('WalletNotReadyError')) {
          alert('Phantom wallet is not ready. Please unlock your wallet and try again.');
        } else {
          alert(`Failed to connect: ${error.message || 'Unknown error'}. Please make sure Phantom is installed and unlocked.`);
        }
      });
    }
  }, [wallet, connected, connecting, connect]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
      }
    };
  }, [connectionTimeout]);

  const handleConnect = () => {
    console.log('Opening wallet selection modal');
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
        setConnectionTimeout(null);
      }
      await disconnect();
      console.log('Wallet disconnected');
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  if (!isClient) {
    return (
      <button className="bg-gray-400 text-white px-4 py-2 rounded-lg font-medium">
        Loading...
      </button>
    );
  }

  if (connected) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            🟢 Connected to {wallet?.adapter?.name}
          </div>
          <button
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
          >
            Disconnect
          </button>
        </div>
        {publicKey && (
          <div className="text-xs text-gray-600">
            {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
          </div>
        )}
      </div>
    );
  }

  if (connecting) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium">
          🔄 Connecting to {wallet?.adapter?.name || 'wallet'}...
        </button>
        <button
          onClick={handleDisconnect}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
    >
      🦋 Select Wallet
    </button>
  );
}
