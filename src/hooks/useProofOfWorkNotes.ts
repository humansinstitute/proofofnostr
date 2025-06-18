import { useQuery } from '@tanstack/react-query';
import { useNostr } from '@nostrify/react';
import type { NostrEvent } from '@nostrify/nostrify';
import { calculateDifficulty, hasProofOfWork } from '@/lib/proofOfWork';

export interface ProofOfWorkNote extends NostrEvent {
  difficulty: number;
}

/**
 * Hook to fetch notes with proof of work, sorted by difficulty (highest first)
 */
export function useProofOfWorkNotes() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['proof-of-work-notes'],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      // Fetch text notes (kind 1)
      const events = await nostr.query([{ 
        kinds: [1], 
        limit: 100 
      }], { signal });

      // Filter events that have proof of work and add difficulty
      const powNotes: ProofOfWorkNote[] = events
        .filter(event => hasProofOfWork(event.id))
        .map(event => ({
          ...event,
          difficulty: calculateDifficulty(event.id)
        }))
        .sort((a, b) => b.difficulty - a.difficulty); // Sort by difficulty descending

      return powNotes;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}