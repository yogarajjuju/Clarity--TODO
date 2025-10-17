import { useEffect, useState, useMemo, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus, Trash2, Loader2 } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { useTodoStore, FilterType } from '@/hooks/useTodoStore';
import { ThemeToggle } from '@/components/ThemeToggle';
export function HomePage() {
  const { todos, filter, loading } = useTodoStore(
    useShallow((state) => ({
      todos: state.todos,
      filter: state.filter,
      loading: state.loading,
    }))
  );
  const { fetchTodos, addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = useTodoStore((state) => state.actions);
  const [newTodoText, setNewTodoText] = useState('');
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };
  const itemsLeft = useMemo(() => todos.filter(t => !t.completed).length, [todos]);
  const hasCompleted = useMemo(() => todos.some(t => t.completed), [todos]);
  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground transition-colors duration-300">
        <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <ThemeToggle className="fixed top-4 right-4" />
        <main className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <header className="text-center space-y-4 mb-12 animate-fade-in">
            <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
              Clarity
            </h1>
            <p className="text-lg text-muted-foreground">A visually stunning, minimalist TODO list.</p>
          </header>
          <motion.div layout className="space-y-8">
            <form onSubmit={handleAddTodo} className="relative">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                className="h-14 text-lg pl-6 pr-20 rounded-lg shadow-sm focus-visible:ring-primary/50 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 rounded-md transition-all duration-200 active:scale-95"
                aria-label="Add Todo"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </form>
            <motion.div layout className="bg-card/80 backdrop-blur-sm border rounded-lg shadow-sm overflow-hidden">
              {loading && (
                <div className="p-8 flex items-center justify-center text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mr-3" />
                  <span>Loading tasks...</span>
                </div>
              )}
              {!loading && todos.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <p className="text-lg">All clear!</p>
                  <p>Add a task to get started.</p>
                </div>
              )}
              {!loading && todos.length > 0 && (
                <>
                  <motion.ul layout className="divide-y divide-border">
                    <AnimatePresence>
                      {filteredTodos.map((todo) => (
                        <motion.li
                          key={todo.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="group flex items-center p-4"
                        >
                          <Checkbox
                            id={`todo-${todo.id}`}
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodo(todo.id)}
                            className="h-6 w-6 rounded-full data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                          />
                          <label
                            htmlFor={`todo-${todo.id}`}
                            className={cn(
                              'flex-1 ml-4 text-lg cursor-pointer transition-colors',
                              todo.completed
                                ? 'text-muted-foreground line-through'
                                : 'text-foreground'
                            )}
                          >
                            {todo.text}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTodo(todo.id)}
                            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                            aria-label="Delete Todo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                  <footer className="flex items-center justify-between p-3 text-sm text-muted-foreground border-t">
                    <span>{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</span>
                    <div className="hidden sm:flex items-center space-x-2">
                      {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
                        <Button
                          key={f}
                          variant={filter === f ? 'secondary' : 'ghost'}
                          size="sm"
                          onClick={() => setFilter(f)}
                          className="capitalize"
                        >
                          {f}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCompleted}
                      className={cn(!hasCompleted && "invisible")}
                    >
                      Clear completed
                    </Button>
                  </footer>
                </>
              )}
            </motion.div>
            {!loading && todos.length > 0 && (
              <div className="sm:hidden flex items-center justify-center p-3 text-sm text-muted-foreground border rounded-lg bg-card/80 backdrop-blur-sm shadow-sm">
                <div className="flex items-center space-x-2">
                  {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
                    <Button
                      key={f}
                      variant={filter === f ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setFilter(f)}
                      className="capitalize"
                    >
                      {f}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          <footer className="text-center mt-16 text-muted-foreground text-sm">
            <p>Built with ❤️ at Cloudflare</p>
          </footer>
        </main>
      </div>
      <Toaster richColors closeButton />
    </>
  );
}