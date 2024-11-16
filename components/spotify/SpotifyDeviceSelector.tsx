"use client";

import { Button } from '../ui/button';
import { Laptop, Smartphone, Speaker } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';

interface Device {
  id: string;
  name: string;
  type: string;
  is_active: boolean;
}

interface SpotifyDeviceSelectorProps {
  devices: Device[];
  onDeviceChange: (deviceId: string) => void;
}

export function SpotifyDeviceSelector({ devices, onDeviceChange }: SpotifyDeviceSelectorProps) {
  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'computer':
        return <Laptop className="h-4 w-4" />;
      case 'smartphone':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Speaker className="h-4 w-4" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Laptop size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          {devices.map((device) => (
            <Button
              key={device.id}
              variant={device.is_active ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => onDeviceChange(device.id)}
            >
              {getDeviceIcon(device.type)}
              <span className="truncate">{device.name}</span>
            </Button>
          ))}
          {devices.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No available devices
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}