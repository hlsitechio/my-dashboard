"use client";

import { Button } from '../ui/button';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface SpotifyPlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkip: (direction: 'next' | 'previous') => void;
}

export function SpotifyPlaybackControls({
  isPlaying,
  onPlayPause,
  onSkip
}: SpotifyPlaybackControlsProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onSkip('previous')}
        className="h-8 w-8"
      >
        <SkipBack size={16} />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onPlayPause}
        className="h-8 w-8"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onSkip('next')}
        className="h-8 w-8"
      >
        <SkipForward size={16} />
      </Button>
    </div>
  );
}