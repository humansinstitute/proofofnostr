import { describe, it, expect } from 'vitest';
import { calculateDifficulty, hasProofOfWork, getCommittedDifficulty, getNonce } from './proofOfWork';

describe('proofOfWork', () => {
  describe('calculateDifficulty', () => {
    it('calculates difficulty correctly for event with leading zeros', () => {
      // Example from NIP-13: 36 leading zero bits
      const eventId = '000000000e9d97a1ab09fc381030b346cdd7a142ad57e6df0b46dc9bef6c7e2d';
      expect(calculateDifficulty(eventId)).toBe(36);
    });

    it('calculates difficulty correctly for event with 10 leading zeros', () => {
      // Example from NIP-13: 002f... has 10 leading zeros
      const eventId = '002f1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab';
      expect(calculateDifficulty(eventId)).toBe(10);
    });

    it('returns 0 for event with no leading zeros', () => {
      const eventId = 'f23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01';
      expect(calculateDifficulty(eventId)).toBe(0);
    });

    it('handles event starting with 1', () => {
      const eventId = '123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01';
      expect(calculateDifficulty(eventId)).toBe(3); // 1 in binary is 0001, so 3 leading zeros
    });
  });

  describe('hasProofOfWork', () => {
    it('returns true for event with proof of work', () => {
      const eventId = '000000000e9d97a1ab09fc381030b346cdd7a142ad57e6df0b46dc9bef6c7e2d';
      expect(hasProofOfWork(eventId)).toBe(true);
    });

    it('returns false for event without proof of work', () => {
      const eventId = 'f23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01';
      expect(hasProofOfWork(eventId)).toBe(false);
    });
  });

  describe('getCommittedDifficulty', () => {
    it('extracts committed difficulty from nonce tag', () => {
      const tags = [
        ['nonce', '776797', '20'],
        ['p', 'somepubkey']
      ];
      expect(getCommittedDifficulty(tags)).toBe(20);
    });

    it('returns null when no nonce tag exists', () => {
      const tags = [
        ['p', 'somepubkey'],
        ['t', 'hashtag']
      ];
      expect(getCommittedDifficulty(tags)).toBe(null);
    });

    it('returns null when nonce tag has no difficulty', () => {
      const tags = [
        ['nonce', '776797'],
        ['p', 'somepubkey']
      ];
      expect(getCommittedDifficulty(tags)).toBe(null);
    });

    it('returns null when difficulty is not a valid number', () => {
      const tags = [
        ['nonce', '776797', 'invalid'],
        ['p', 'somepubkey']
      ];
      expect(getCommittedDifficulty(tags)).toBe(null);
    });
  });

  describe('getNonce', () => {
    it('extracts nonce value from nonce tag', () => {
      const tags = [
        ['nonce', '776797', '20'],
        ['p', 'somepubkey']
      ];
      expect(getNonce(tags)).toBe('776797');
    });

    it('returns null when no nonce tag exists', () => {
      const tags = [
        ['p', 'somepubkey'],
        ['t', 'hashtag']
      ];
      expect(getNonce(tags)).toBe(null);
    });

    it('returns null when nonce tag has no value', () => {
      const tags = [
        ['nonce'],
        ['p', 'somepubkey']
      ];
      expect(getNonce(tags)).toBe(null);
    });
  });
});