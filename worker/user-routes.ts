import { Hono } from "hono";
import type { Env } from './core-utils';
import { TodoEntity } from "./entities";
import { ok, bad, notFound } from './core-utils';
import type { Todo } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'CF Workers Demo' }}));
  // TODO Routes
  app.get('/api/todos', async (c) => {
    await TodoEntity.ensureSeed(c.env);
    const { items } = await TodoEntity.list(c.env);
    return ok(c, items.sort((a, b) => a.createdAt - b.createdAt));
  });
  app.post('/api/todos', async (c) => {
    const { text } = (await c.req.json()) as { text?: string };
    if (!text?.trim()) return bad(c, 'text required');
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    const created = await TodoEntity.create(c.env, newTodo);
    return ok(c, created);
  });
  app.put('/api/todos/:id', async (c) => {
    const id = c.req.param('id');
    const todoEntity = new TodoEntity(c.env, id);
    if (!(await todoEntity.exists())) return notFound(c, 'todo not found');
    const updatedTodo = await todoEntity.mutate(todo => ({ ...todo, completed: !todo.completed }));
    return ok(c, updatedTodo);
  });
  app.delete('/api/todos/:id', async (c) => {
    const id = c.req.param('id');
    const deleted = await TodoEntity.delete(c.env, id);
    if (!deleted) return notFound(c, 'todo not found');
    return ok(c, { id, deleted });
  });
  app.post('/api/todos/clear-completed', async (c) => {
    const { items } = await TodoEntity.list(c.env);
    const completedIds = items.filter(todo => todo.completed).map(todo => todo.id);
    if (completedIds.length === 0) {
      return ok(c, { deletedCount: 0, ids: [] });
    }
    const deletedCount = await TodoEntity.deleteMany(c.env, completedIds);
    return ok(c, { deletedCount, ids: completedIds });
  });

}