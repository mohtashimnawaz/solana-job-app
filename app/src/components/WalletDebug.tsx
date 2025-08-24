'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

export default function WalletDebug() {
  const { wallets } = useWallet();
  const [phantomDetected, setPhantomDetected] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if Phantom is installed in the browser
    const checkPhantom = () => {
      if (typeof window !== 'undefined') {
        const isPhantomInstalled = !!(window as any).phantom?.solana?.isPhantom;
        setPhantomDetected(isPhantomInstalled);
        console.log('Phantom detection:', {
          isPhantomInstalled,
          phantom: (window as any).phantom,
          wallets: wallets.map(w => w.adapter.name)
        });
      }
    };
    
    checkPhantom();
  }, [wallets]);
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs">
      <div className="font-bold mb-2">🔍 Wallet Debug Info</div>
      <div>Phantom Detected: {phantomDetected === null ? 'Checking...' : phantomDetected ? '✅ Yes' : '❌ No'}</div>
      <div>Available Wallets: {wallets.length}</div>
      {wallets.map((wallet, index) => (
        <div key={index}>• {wallet.adapter.name}</div>
      ))}
      {!phantomDetected && (
        <div className="mt-2 text-yellow-300">
          Install Phantom: <a href="https://phantom.app/" target="_blank" className="underline">phantom.app</a>
        </div>
      )}
    </div>
  );
}
