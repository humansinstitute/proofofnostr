import { useProofOfWorkNotes } from '@/hooks/useProofOfWorkNotes';
import { ProofOfWorkNote } from '@/components/ProofOfWorkNote';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RelaySelector } from '@/components/RelaySelector';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

export function ProofOfWorkFeed() {
  const { data: notes, isLoading, error } = useProofOfWorkNotes();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="py-12 px-8 text-center">
          <div className="max-w-sm mx-auto space-y-4">
            <p className="text-destructive">
              Failed to load notes. Please check your connection and try again.
            </p>
            <RelaySelector className="w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 px-8 text-center">
          <div className="max-w-sm mx-auto space-y-6">
            <div className="flex justify-center">
              <Zap className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No Proof of Work Notes Found</h3>
              <p className="text-muted-foreground">
                No notes with proof of work were found on this relay. Try switching to a different relay or wait for miners to publish new content.
              </p>
            </div>
            <RelaySelector className="w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h2 className="text-xl font-semibold">Proof of Work Notes</h2>
        </div>
        <Badge variant="secondary" className="font-mono">
          {notes.length} notes found
        </Badge>
      </div>
      
      <div className="space-y-4">
        {notes.map((note, index) => (
          <div key={note.id} className="relative">
            <div className="absolute -left-8 top-4 text-sm font-mono text-muted-foreground">
              #{index + 1}
            </div>
            <ProofOfWorkNote note={note} />
          </div>
        ))}
      </div>
    </div>
  );
}