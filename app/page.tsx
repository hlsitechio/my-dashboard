"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimeDisplay } from '@/components/TimeDisplay';
import { DraggableMenu } from '@/components/DraggableMenu';
import { VideoBanner } from '@/components/VideoBanner';
import { ImportantTasks } from '@/components/ImportantTasks';
import { Notes } from '@/components/Notes';
import { ToDo } from '@/components/ToDo';
import { CalendarView } from '@/components/CalendarView';
import { SpotifyController } from '@/components/SpotifyController';
import { ClientOnly } from '@/components/ClientOnly';

interface Tab {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [date, setDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<{ text: string; dueDate: Date | null; completed: boolean; }[]>([]);
  const [notes, setNotes] = useState<{ text: string; date: Date; }[]>([]);
  const [todos, setTodos] = useState<{ text: string; completed: boolean; date: Date; }[]>([]);

  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'important', icon: '⚠️', label: 'Important' },
    { id: 'notes', icon: '📝', label: 'Notes' },
    { id: 'calendar', icon: '📅', label: 'Calendar' },
    { id: 'todo', icon: '✓', label: 'To Do' },
  ]);

  return (
    <div className="flex min-h-screen">
      <motion.div
        className={`glass-effect fixed left-0 top-0 h-full ${
          isCollapsed ? "w-20" : "w-64"
        } p-4 transition-all duration-300 z-20`}
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 256,
        }}
      >
        <div className="flex flex-col h-full">
          <TimeDisplay isCollapsed={isCollapsed} />
          <div className="flex justify-between items-center my-4">
            {!isCollapsed && (
              <h1 className="text-xl font-bold">HLSiTecH</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
          <ClientOnly>
            <DraggableMenu
              tabs={tabs}
              activeTab={activeTab}
              isCollapsed={isCollapsed}
              onTabsReorder={setTabs}
              onTabClick={setActiveTab}
            />
          </ClientOnly>
          <div className="mt-auto">
            <SpotifyController isCollapsed={isCollapsed} />
          </div>
        </div>
      </motion.div>

      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {activeTab === 'home' && (
          <div className="p-6">
            <VideoBanner />
            <div className="mt-6">
              <h2 className="text-3xl font-bold mb-6">Welcome HLSiTecH</h2>
            </div>
          </div>
        )}

        {activeTab === 'important' && (
          <div className="p-6">
            <ImportantTasks tasks={tasks} setTasks={setTasks} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="p-6">
            <Notes notes={notes} setNotes={setNotes} />
          </div>
        )}

        {activeTab === 'todo' && (
          <div className="p-6">
            <ToDo todos={todos} setTodos={setTodos} />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="p-6">
            <CalendarView
              date={date}
              setDate={setDate}
              importantTasks={tasks}
              notes={notes}
              todos={todos}
            />
          </div>
        )}
      </main>
    </div>
  );
}