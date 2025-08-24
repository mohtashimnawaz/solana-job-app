import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import idl from '../idl/solana_job_app.json';

// Program ID from your deployed smart contract
export const PROGRAM_ID = new PublicKey('DTbNxyP1MWLtgDHQiqWoAQGnQBee2g1AECxeQT1s5pUv');

// Connection to local Solana cluster
export const connection = new Connection('http://localhost:8899', 'confirmed');

// Get the program instance
export function getProgram(provider: AnchorProvider) {
  return new Program(idl as any, provider);
}

// Helper functions for deriving account addresses
export function getStudentPDA(authority: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('student'), authority.toBuffer()],
    PROGRAM_ID
  );
}

export function getVendorPDA(authority: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('vendor'), authority.toBuffer()],
    PROGRAM_ID
  );
}

export function getJobPDA(vendor: PublicKey, jobId: number) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('job'), vendor.toBuffer(), Buffer.from(jobId.toString())],
    PROGRAM_ID
  );
}
