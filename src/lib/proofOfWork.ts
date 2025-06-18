/**
 * Calculate the proof of work difficulty for a Nostr event ID.
 * Difficulty is defined as the number of leading zero bits in the event ID.
 * Based on NIP-13: https://github.com/nostr-protocol/nips/blob/master/13.md
 */
export function calculateDifficulty(eventId: string): number {
  let count = 0;

  for (let i = 0; i < eventId.length; i++) {
    const nibble = parseInt(eventId[i], 16);
    if (nibble === 0) {
      count += 4;
    } else {
      count += Math.clz32(nibble) - 28;
      break;
    }
  }

  return count;
}

/**
 * Check if an event has proof of work (difficulty > 0)
 */
export function hasProofOfWork(eventId: string): boolean {
  return calculateDifficulty(eventId) > 0;
}

/**
 * Get the committed target difficulty from a nonce tag
 */
export function getCommittedDifficulty(tags: string[][]): number | null {
  const nonceTag = tags.find(tag => tag[0] === 'nonce');
  if (!nonceTag || nonceTag.length < 3) {
    return null;
  }
  
  const difficulty = parseInt(nonceTag[2], 10);
  return isNaN(difficulty) ? null : difficulty;
}

/**
 * Get the nonce value from a nonce tag
 */
export function getNonce(tags: string[][]): string | null {
  const nonceTag = tags.find(tag => tag[0] === 'nonce');
  if (!nonceTag || nonceTag.length < 2) {
    return null;
  }
  
  return nonceTag[1];
}