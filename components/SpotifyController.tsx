"use client";

import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Music2 } from 'lucide-react';
import { spotifyApiClient, getTokenFromUrl, loginUrl } from '@/lib/spotify';
import { useToast } from './ui/use-toast';
import { SpotifyDeviceSelector } from './spotify/SpotifyDeviceSelector';
import { SpotifyPlaybackControls } from './spotify/SpotifyPlaybackControls';
import { SpotifyVolumeControl } from './spotify/SpotifyVolumeControl';
import { SpotifyTrackInfo } from './spotify/SpotifyTrackInfo';

interface SpotifyState {
  isPlaying: boolean;
  currentTrack: {
    name: string;
    artist: string;
    albumArt?: string;
  } | null;
  volume: number;
  token: string | null;
  devices: Array<{
    id: string;
    name: string;
    type: string;
    is_active: boolean;
  }>;
}

export function SpotifyController({ isCollapsed }: { isCollapsed: boolean }) {
  const [state, setState] = useState<SpotifyState>({
    isPlaying: false,
    currentTrack: null,
    volume: 50,
    token: null,
    devices: [],
  });
  const { toast } = useToast();

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      setState(prev => ({ ...prev, token }));
      window.localStorage.setItem('spotify_token', token);
      window.history.pushState({}, '', window.location.pathname);
    } else {
      const storedToken = window.localStorage.getItem('spotify_token');
      if (storedToken) {
        setState(prev => ({ ...prev, token: storedToken }));
      }
    }
  }, []);

  useEffect(() => {
    if (!state.token) return;

    const fetchData = async () => {
      try {
        const [trackData, devices] = await Promise.all([
          spotifyApiClient.getCurrentTrack(state.token!),
          spotifyApiClient.getDevices(state.token!)
        ]);

        if (trackData) {
          setState(prev => ({
            ...prev,
            isPlaying: trackData.is_playing,
            currentTrack: {
              name: trackData.item.name,
              artist: trackData.item.artists[0].name,
              albumArt: trackData.item.album.images[0]?.url,
            },
            devices
          }));
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [state.token]);

  const handlePlayPause = async () => {
    if (!state.token) {
      toast({
        title: "Not connected to Spotify",
        description: "Please connect your Spotify account first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await spotifyApiClient.controlPlayback(state.token, state.isPlaying ? 'pause' : 'play');
    } catch (error) {
      toast({
        title: "Playback control failed",
        description: "Make sure you have an active Spotify device.",
        variant: "destructive",
      });
    }
  };

  const handleSkip = async (direction: 'next' | 'previous') => {
    if (!state.token) return;
    try {
      await spotifyApiClient.skipTrack(state.token, direction);
    } catch (error) {
      toast({
        title: "Skip failed",
        description: "Unable to skip track. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleVolumeChange = async (value: number[]) => {
    if (!state.token) return;
    try {
      await spotifyApiClient.setVolume(state.token, value[0]);
      setState(prev => ({ ...prev, volume: value[0] }));
    } catch (error) {
      toast({
        title: "Volume control failed",
        description: "Unable to change volume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeviceChange = async (deviceId: string) => {
    if (!state.token) return;
    try {
      await spotifyApiClient.transferPlayback(state.token, deviceId);
      toast({
        title: "Playback transferred",
        description: "Successfully switched playback device.",
      });
    } catch (error) {
      toast({
        title: "Device switch failed",
        description: "Unable to switch playback device. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!state.token) {
    return (
      <Card className={`glass-effect p-4 ${isCollapsed ? 'mx-0' : 'mx-2'}`}>
        <div className="flex flex-col items-center gap-2">
          <Music2 className="w-8 h-8 text-muted-foreground" />
          {!isCollapsed && (
            <a
              href={loginUrl}
              className="text-sm text-primary hover:underline"
            >
              Connect Spotify
            </a>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`glass-effect p-4 ${isCollapsed ? 'mx-0' : 'mx-2'}`}>
      {!isCollapsed && state.currentTrack && (
        <SpotifyTrackInfo track={state.currentTrack} />
      )}
      
      <div className="flex justify-center items-center gap-2">
        <SpotifyPlaybackControls
          isPlaying={state.isPlaying}
          onPlayPause={handlePlayPause}
          onSkip={handleSkip}
        />

        {!isCollapsed && (
          <SpotifyDeviceSelector
            devices={state.devices}
            onDeviceChange={handleDeviceChange}
          />
        )}
      </div>

      {!isCollapsed && (
        <SpotifyVolumeControl
          volume={state.volume}
          onVolumeChange={handleVolumeChange}
        />
      )}
    </Card>
  );
}