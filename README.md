# PoW Notes - Proof of Work Nostr Client

A simple Nostr client that displays notes sorted by their proof of work difficulty. Only notes with computational proof of work are shown, with the highest difficulty notes appearing at the top.

## Features

- **Proof of Work Filtering**: Only displays notes that have proof of work (difficulty > 0)
- **Difficulty Sorting**: Notes are sorted by difficulty in descending order (highest first)
- **Visual Difficulty Indicators**: Color-coded badges show difficulty levels:
  - 🟡 Yellow: 20+ leading zeros (high difficulty)
  - 🟠 Orange: 10-19 leading zeros (medium difficulty)  
  - 🔵 Blue: 1-9 leading zeros (low difficulty)
- **Ranking System**: Shows numerical ranking (#1, #2, etc.) based on difficulty
- **Real-time Updates**: Automatically refreshes every 30 seconds
- **Relay Switching**: Easy relay selector to discover content from different sources
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Automatic theme switching support

## How Proof of Work Works

Based on [NIP-13](https://github.com/nostr-protocol/nips/blob/master/13.md), proof of work in Nostr is determined by the number of leading zero bits in the event ID. Miners add a `nonce` tag to their events and repeatedly hash until they achieve the desired difficulty.

Example note with proof of work:
```json
{
  "id": "000006d8c378af1779d2feebc7603a125d99eca0ccf1085959b307f64e5dd358",
  "tags": [["nonce", "776797", "20"]],
  "content": "It's just me mining my own business"
}
```

The event ID starts with 6 zero nibbles (24 zero bits), indicating significant computational work.

## Technical Implementation

- **React 18** with TypeScript for type safety
- **TailwindCSS** for styling with Inter Variable font
- **Nostrify** for Nostr protocol integration
- **TanStack Query** for data fetching and caching
- **shadcn/ui** components for consistent UI
- **Vite** for fast development and building

## Key Components

- `calculateDifficulty()`: Counts leading zero bits in event IDs
- `useProofOfWorkNotes()`: Fetches and filters notes with PoW
- `ProofOfWorkNote`: Displays individual notes with difficulty info
- `ProofOfWorkFeed`: Main feed component with ranking

## Getting Started

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

### Deploy to GitHub Pages
1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings (Source: GitHub Actions)
3. The site will automatically deploy on every push to main branch
4. Access your site at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Relay Configuration

The app connects to `wss://relay.nostr.band` by default. You can switch relays using the relay selector in the header to discover different content.

---

*Vibed with [MKStack](https://soapbox.pub/tools/mkstack/)*