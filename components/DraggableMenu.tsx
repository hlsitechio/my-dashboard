"use client";

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableMenuItem } from './SortableMenuItem';
import { Button } from './ui/button';

interface Tab {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface DraggableMenuProps {
  tabs: Tab[];
  activeTab: string;
  isCollapsed: boolean;
  onTabsReorder: (newTabs: Tab[]) => void;
  onTabClick: (tabId: string) => void;
}

export function DraggableMenu({
  tabs,
  activeTab,
  isCollapsed,
  onTabsReorder,
  onTabClick,
}: DraggableMenuProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
      const newIndex = tabs.findIndex((tab) => tab.id === over.id);
      const newTabs = arrayMove(tabs, oldIndex, newIndex);
      onTabsReorder(newTabs);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tabs} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {tabs.map((tab) => (
            <SortableMenuItem
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              isCollapsed={isCollapsed}
              onClick={() => onTabClick(tab.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}