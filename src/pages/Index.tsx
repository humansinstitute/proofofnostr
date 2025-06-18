import { useSeoMeta } from '@unhead/react';
import { ProofOfWorkFeed } from '@/components/ProofOfWorkFeed';
import { LoginArea } from '@/components/auth/LoginArea';
import { RelaySelector } from '@/components/RelaySelector';
import { Zap } from 'lucide-react';

const Index = () => {
  useSeoMeta({
    title: 'PoW Notes - Proof of Work Nostr Client',
    description: 'A Nostr client that displays notes sorted by their proof of work difficulty. Only notes with computational work are shown.',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                <h1 className="text-2xl font-bold">PoW Notes</h1>
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Proof of Work Nostr Client
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <RelaySelector className="max-w-60" />
              <LoginArea className="max-w-60" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto pl-8">
          <div className="mb-8 text-center space-y-2">
            <p className="text-muted-foreground">
              Displaying notes sorted by computational proof of work difficulty.
            </p>
            <p className="text-sm text-muted-foreground">
              Higher difficulty notes appear first. Only notes with PoW are shown.
            </p>
          </div>
          
          <ProofOfWorkFeed />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Built with Nostr protocol and NIP-13 Proof of Work</p>
            <a 
              href="https://soapbox.pub/tools/mkstack/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Vibed with MKStack
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
