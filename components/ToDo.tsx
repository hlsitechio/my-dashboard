"use client";

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { CheckSquare, Edit2, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from './ui/use-toast';

interface Todo {
  text: string;
  completed: boolean;
  date: Date;
}

interface TodoProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function ToDo({ todos, setTodos }: TodoProps) {
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const { toast } = useToast();

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        text: newTodo,
        completed: false,
        date: new Date(),
      };
      setTodos([...todos, todo]);
      setNewTodo('');

      toast({
        title: "Todo added",
        description: "Your todo has been added successfully.",
      });
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = (index: number) => {
    if (editText.trim()) {
      const newTodos = [...todos];
      newTodos[index] = {
        ...newTodos[index],
        text: editText,
      };
      setTodos(newTodos);
      setEditingIndex(null);
      setEditText('');

      toast({
        title: "Todo updated",
        description: "Your todo has been updated successfully.",
      });
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    toast({
      title: "Todo deleted",
      description: "Todo has been removed successfully.",
    });
  };

  return (
    <Card className="glass-effect p-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckSquare className="text-primary" size={24} />
        <h2 className="text-2xl font-semibold">To Do</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <div className="space-y-4">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`p-4 glass-effect rounded-lg relative group ${
              todo.completed ? 'opacity-60' : ''
            }`}
          >
            {editingIndex === index ? (
              <div className="flex gap-2">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(index)}
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => saveEdit(index)}
                  className="shrink-0"
                >
                  <Save size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={cancelEdit}
                  className="shrink-0"
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <p className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                    {todo.text}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(todo.date, "PPpp")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditing(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/90"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {todos.length === 0 && (
          <p className="text-center text-muted-foreground">
            No todos yet. Start by adding one above!
          </p>
        )}
      </div>
    </Card>
  );
}