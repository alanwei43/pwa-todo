import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends IndexedDbService {
  private storeName: string = "todo";
  constructor() {
    super(7, "pwa-app", db => {
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { autoIncrement: true });
      }
    });
  }
  async createTodo(todo: Todo): Promise<Todo> {
    const item = await this.insert(this.storeName, todo);
    return item;
  }
  async getTodoList(): Promise<Todo[]> {
    const todos = this.getAll<Todo>(this.storeName);
    return todos;
  }
  async getTodoGroups(): Promise<string[]> {
    const todos = await this.getTodoList();
    const groups = new Set<string>();
    todos.forEach(item => groups.add(item.group));
    return Array.from(groups);
  }
}
