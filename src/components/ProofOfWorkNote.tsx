import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NoteContent } from '@/components/NoteContent';
import { useAuthor } from '@/hooks/useAuthor';
import { genUserName } from '@/lib/genUserName';
import { getCommittedDifficulty, getNonce } from '@/lib/proofOfWork';
import type { ProofOfWorkNote } from '@/hooks/useProofOfWorkNotes';
import { formatDistanceToNow } from 'date-fns';

interface ProofOfWorkNoteProps {
  note: ProofOfWorkNote;
}

export function ProofOfWorkNote({ note }: ProofOfWorkNoteProps) {
  const author = useAuthor(note.pubkey);
  const metadata = author.data?.metadata;
  
  const displayName = metadata?.name ?? genUserName(note.pubkey);
  const profileImage = metadata?.picture;
  const committedDifficulty = getCommittedDifficulty(note.tags);
  const nonce = getNonce(note.tags);
  
  const timeAgo = formatDistanceToNow(new Date(note.created_at * 1000), { addSuffix: true });

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profileImage} alt={displayName} />
              <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{displayName}</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge 
              variant="secondary" 
              className={`font-mono ${
                note.difficulty >= 20 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                note.difficulty >= 10 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}
            >
              ⚡ {note.difficulty}
            </Badge>
            {committedDifficulty && (
              <Badge variant="outline" className="text-xs">
                Target: {committedDifficulty}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="whitespace-pre-wrap break-words mb-3">
          <NoteContent event={note} className="text-sm" />
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="font-mono">ID: {note.id.slice(0, 16)}...</span>
            {nonce && (
              <span className="font-mono">Nonce: {nonce}</span>
            )}
          </div>
          <span className="font-mono">{note.difficulty} leading zeros</span>
        </div>
      </CardContent>
    </Card>
  );
}