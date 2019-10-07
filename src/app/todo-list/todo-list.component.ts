import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { PubSubService } from '../services/pub-sub.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor(
    private todoSvc: TodoService,
    private route: ActivatedRoute,
    private location: Location,
    private hubSvc: PubSubService
  ) { }
  ngOnInit() {
    this.loadTodoList();
  }
  todoList: Array<Todo> = [];
  async loadTodoList() {
    const all = await this.todoSvc.getTodoList();
    this.route.params.subscribe(params => {
      const group = params["group"];
      this.todoList = all.filter(item => item.group === group);
      console.log("group: ", group)
    });
  }
}
