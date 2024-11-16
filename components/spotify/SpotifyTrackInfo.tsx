"use client";

interface SpotifyTrackInfoProps {
  track: {
    name: string;
    artist: string;
    albumArt?: string;
  };
}

export function SpotifyTrackInfo({ track }: SpotifyTrackInfoProps) {
  return (
    <div className="mb-3 text-center">
      {track.albumArt && (
        <img
          src={track.albumArt}
          alt="Album Art"
          className="w-16 h-16 mx-auto mb-2 rounded-md"
        />
      )}
      <p className="font-medium truncate">{track.name}</p>
      <p className="text-sm text-muted-foreground truncate">
        {track.artist}
      </p>
    </div>
  );
}