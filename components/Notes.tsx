"use client";

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { NotebookPen, X } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from './ui/use-toast';

interface Note {
  text: string;
  date: Date;
}

interface NotesProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export function Notes({ notes, setNotes }: NotesProps) {
  const [newNote, setNewNote] = useState('');
  const { toast } = useToast();

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        text: newNote,
        date: new Date(),
      };
      setNotes([...notes, note]);
      setNewNote('');

      toast({
        title: "Note added",
        description: "Your note has been saved successfully.",
      });
    }
  };

  const deleteNote = (index: number) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);

    toast({
      title: "Note deleted",
      description: "Note has been removed successfully.",
    });
  };

  return (
    <Card className="glass-effect p-6">
      <div className="flex items-center gap-2 mb-6">
        <NotebookPen className="text-primary" size={24} />
        <h2 className="text-2xl font-semibold">Notes</h2>
      </div>

      <div className="space-y-4 mb-6">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
          className="min-h-[100px]"
        />
        <Button onClick={addNote} className="w-full">
          Add Note
        </Button>
      </div>

      <div className="space-y-4">
        {notes.map((note, index) => (
          <div
            key={index}
            className="p-4 glass-effect rounded-lg relative group"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNote(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </Button>
            <p className="mb-2 pr-8">{note.text}</p>
            <p className="text-sm text-muted-foreground">
              {format(note.date, "PPpp")}
            </p>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="text-center text-muted-foreground">
            No notes yet. Start by adding one above!
          </p>
        )}
      </div>
    </Card>
  );
}