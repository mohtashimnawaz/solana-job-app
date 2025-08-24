'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';

export default function WalletTransactionTest() {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [testing, setTesting] = useState(false);

  const testWalletAuth = async () => {
    if (!publicKey || !signTransaction) {
      alert('Please connect your wallet first');
      return;
    }

    setTesting(true);
    try {
      // Create a simple transaction that transfers 0.001 SOL to yourself
      // This will require your wallet password/approval
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // sending to yourself
          lamports: LAMPORTS_PER_SOL * 0.001, // 0.001 SOL
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // This will trigger Phantom to ask for your password/approval
      const signedTransaction = await signTransaction(transaction);
      
      alert('✅ Transaction signed successfully! This proves your wallet authentication is working. (Transaction was not sent)');
      console.log('Signed transaction:', signedTransaction);
      
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        alert('Transaction cancelled - this is normal if you clicked "Cancel" in Phantom');
      } else {
        console.error('Transaction error:', error);
        alert(`Transaction failed: ${error.message}`);
      }
    } finally {
      setTesting(false);
    }
  };

  if (!publicKey) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
      <h3 className="font-bold text-yellow-800 mb-2">🧪 Test Real Wallet Authentication</h3>
      <p className="text-sm text-yellow-700 mb-3">
        Want to see Phantom ask for your password? Click below to test a transaction signature.
        This will trigger the real wallet authentication flow.
      </p>
      <button
        onClick={testWalletAuth}
        disabled={testing}
        className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white px-4 py-2 rounded font-medium transition-colors"
      >
        {testing ? '🔄 Testing...' : '🔐 Test Wallet Authentication'}
      </button>
      <p className="text-xs text-yellow-600 mt-2">
        * This creates a test transaction (not sent) that will require your approval
      </p>
    </div>
  );
}
