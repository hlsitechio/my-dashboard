"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from './ui/button';
import { GripVertical } from 'lucide-react';

interface Tab {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface SortableMenuItemProps {
  tab: Tab;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

export function SortableMenuItem({
  tab,
  isActive,
  isCollapsed,
  onClick,
}: SortableMenuItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 ${
        isDragging ? 'z-50' : ''
      }`}
    >
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`w-full justify-start gap-2 ${
          isCollapsed ? "px-2" : "px-4"
        } group`}
        onClick={onClick}
      >
        <div
          {...attributes}
          {...listeners}
          className="opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={16} className="text-muted-foreground" />
        </div>
        {tab.icon}
        {!isCollapsed && <span>{tab.label}</span>}
      </Button>
    </div>
  );
}