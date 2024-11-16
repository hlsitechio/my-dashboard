"use client";

import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, AlertCircle } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface Task {
  text: string;
  dueDate: Date | null;
  completed: boolean;
}

interface ImportantTasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function ImportantTasks({ tasks, setTasks }: ImportantTasksProps) {
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const { toast } = useToast();

  const addTask = () => {
    if (newTask.trim()) {
      const task = { text: newTask, dueDate, completed: false };
      setTasks([...tasks, task]);
      setNewTask('');
      setDueDate(null);

      toast({
        title: "Task added",
        description: "Task has been added successfully.",
      });
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    toast({
      title: "Task deleted",
      description: "Task has been removed successfully.",
    });
  };

  return (
    <Card className="glass-effect p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="text-red-500" size={24} />
        <h2 className="text-2xl font-semibold">Important Tasks</h2>
      </div>
      
      <div className="flex gap-4 mb-6">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add an important task..."
          className="flex-1"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn(
              "justify-start text-left font-normal",
              !dueDate && "text-muted-foreground"
            )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : <span>Pick a due date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate || undefined}
              onSelect={setDueDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={addTask}>Add Task</Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 glass-effect rounded-lg ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
              className="w-5 h-5"
            />
            <div className="flex-1">
              <span
                className={`block ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.text}
              </span>
              {task.dueDate && (
                <span className="text-sm text-muted-foreground">
                  Due: {format(task.dueDate, "PPP")}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTask(index)}
              className="text-destructive hover:text-destructive/90"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}