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
    this.clear(this.storeName);
  }
  async createTodo(todo: Todo): Promise<void> {
    await this.insert(this.storeName, todo);
  }
  async getTodoList(): Promise<Todo[]> {
    const todos = this.getAll<Todo>(this.storeName);
    return todos;
  }
}
