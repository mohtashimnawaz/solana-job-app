'use client';

import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

export function WalletContextProvider({ children }: { children: React.ReactNode }) {
  // Use localhost for development
  const endpoint = 'http://localhost:8899';
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={(error) => {
          console.error('Wallet error:', error);
          if (error.message?.includes('User rejected')) {
            console.log('User cancelled wallet connection');
          } else if (error.message?.includes('not found')) {
            alert('Phantom wallet not found. Please install Phantom wallet extension from https://phantom.app/');
          } else {
            console.error('Wallet connection error:', error.message);
          }
        }}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
