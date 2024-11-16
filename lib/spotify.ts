"use client";

import SpotifyWebApi from 'spotify-web-api-node';

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/callback';

const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
];

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

// Create the authorization URL manually since we're in the browser
export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&show_dialog=true`;

export const getTokenFromUrl = () => {
  if (typeof window === "undefined") return null;
  
  const hash = window.location.hash;
  if (!hash) return null;
  
  const params = new URLSearchParams(hash.substring(1));
  return params.get("access_token");
};

export const spotifyApiClient = {
  getCurrentTrack: async (token: string) => {
    spotifyApi.setAccessToken(token);
    try {
      const response = await spotifyApi.getMyCurrentPlayingTrack();
      return response.body;
    } catch (error) {
      console.error("Error fetching current track:", error);
      return null;
    }
  },

  controlPlayback: async (token: string, action: "play" | "pause") => {
    spotifyApi.setAccessToken(token);
    try {
      if (action === "play") {
        await spotifyApi.play();
      } else {
        await spotifyApi.pause();
      }
    } catch (error) {
      console.error("Error controlling playback:", error);
      throw error;
    }
  },

  skipTrack: async (token: string, direction: "next" | "previous") => {
    spotifyApi.setAccessToken(token);
    try {
      if (direction === "next") {
        await spotifyApi.skipToNext();
      } else {
        await spotifyApi.skipToPrevious();
      }
    } catch (error) {
      console.error("Error skipping track:", error);
      throw error;
    }
  },

  setVolume: async (token: string, volumePercent: number) => {
    spotifyApi.setAccessToken(token);
    try {
      await spotifyApi.setVolume(volumePercent);
    } catch (error) {
      console.error("Error setting volume:", error);
      throw error;
    }
  },

  getDevices: async (token: string) => {
    spotifyApi.setAccessToken(token);
    try {
      const response = await spotifyApi.getMyDevices();
      return response.body.devices;
    } catch (error) {
      console.error("Error getting devices:", error);
      return [];
    }
  },

  transferPlayback: async (token: string, deviceId: string) => {
    spotifyApi.setAccessToken(token);
    try {
      await spotifyApi.transferMyPlayback([deviceId]);
    } catch (error) {
      console.error("Error transferring playback:", error);
      throw error;
    }
  },

  toggleShuffle: async (token: string, state: boolean) => {
    spotifyApi.setAccessToken(token);
    try {
      await spotifyApi.setShuffle(state);
    } catch (error) {
      console.error("Error toggling shuffle:", error);
      throw error;
    }
  },

  setRepeatMode: async (token: string, state: 'off' | 'track' | 'context') => {
    spotifyApi.setAccessToken(token);
    try {
      await spotifyApi.setRepeat(state);
    } catch (error) {
      console.error("Error setting repeat mode:", error);
      throw error;
    }
  }
};