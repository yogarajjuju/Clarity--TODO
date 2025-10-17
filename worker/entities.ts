/**
 * Defines the Durable Object entity for a single Todo item.
 */
import { IndexedEntity } from "./core-utils";
import type { Todo } from "@shared/types";
import { MOCK_TODOS } from "@shared/mock-data";

// TODO ENTITY: one DO instance per todo item
export class TodoEntity extends IndexedEntity<Todo> {
  static readonly entityName = "todo";
  static readonly indexName = "todos";
  static readonly initialState: Todo = { id: "", text: "", completed: false, createdAt: 0 };
  static seedData = MOCK_TODOS;
}
//