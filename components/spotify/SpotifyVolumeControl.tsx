"use client";

import { Volume2 } from 'lucide-react';
import { Slider } from '../ui/slider';

interface SpotifyVolumeControlProps {
  volume: number;
  onVolumeChange: (value: number[]) => void;
}

export function SpotifyVolumeControl({ volume, onVolumeChange }: SpotifyVolumeControlProps) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <Volume2 size={16} />
      <Slider
        value={[volume]}
        onValueChange={onVolumeChange}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  );
}