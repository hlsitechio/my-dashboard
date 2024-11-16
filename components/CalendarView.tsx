"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { AlertCircle, NotebookPen, CheckSquare } from "lucide-react";

interface CalendarViewProps {
  date: Date;
  setDate: (date: Date) => void;
  importantTasks: { text: string; dueDate: Date | null; completed: boolean }[];
  notes: { text: string; date: Date }[];
  todos: { text: string; completed: boolean; date: Date }[];
}

export function CalendarView({
  date,
  setDate,
  importantTasks,
  notes,
  todos,
}: CalendarViewProps) {
  const filteredTasks = importantTasks.filter(
    (task) => task.dueDate && isSameDay(task.dueDate, date)
  );
  const filteredNotes = notes.filter((note) => isSameDay(note.date, date));
  const filteredTodos = todos.filter((todo) => isSameDay(todo.date, date));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-effect p-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border-none"
        />
      </Card>

      <div className="space-y-6">
        <Card className="glass-effect p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-red-500" size={20} />
            <h3 className="text-lg font-semibold">Important Tasks</h3>
          </div>
          {filteredTasks.length > 0 ? (
            <div className="space-y-2">
              {filteredTasks.map((task, index) => (
                <div
                  key={index}
                  className={`p-2 glass-effect rounded ${
                    task.completed ? "opacity-60" : ""
                  }`}
                >
                  <span
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No important tasks for this date</p>
          )}
        </Card>

        <Card className="glass-effect p-6">
          <div className="flex items-center gap-2 mb-4">
            <NotebookPen size={20} />
            <h3 className="text-lg font-semibold">Notes</h3>
          </div>
          {filteredNotes.length > 0 ? (
            <div className="space-y-2">
              {filteredNotes.map((note, index) => (
                <div key={index} className="p-2 glass-effect rounded">
                  {note.text}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No notes for this date</p>
          )}
        </Card>

        <Card className="glass-effect p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare size={20} />
            <h3 className="text-lg font-semibold">Todos</h3>
          </div>
          {filteredTodos.length > 0 ? (
            <div className="space-y-2">
              {filteredTodos.map((todo, index) => (
                <div
                  key={index}
                  className={`p-2 glass-effect rounded ${
                    todo.completed ? "opacity-60" : ""
                  }`}
                >
                  <span
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No todos for this date</p>
          )}
        </Card>
      </div>
    </div>
  );
}