"use client";

import { useState, useEffect } from 'react';

interface TimeDisplayProps {
  isCollapsed: boolean;
}

export function TimeDisplay({ isCollapsed }: TimeDisplayProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !isCollapsed, // Use 24h format when collapsed
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="text-center">
      <h2 className={`font-light ${isCollapsed ? 'text-lg' : 'text-2xl'}`}>
        {formatTime(time)}
      </h2>
      {!isCollapsed && (
        <p className="text-sm text-muted-foreground">{formatDate(time)}</p>
      )}
    </div>
  );
}