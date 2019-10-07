import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  todo = this.getEmptyTodo();
  constructor(
    private todoSvc: TodoService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
  }
  getEmptyTodo() {
    return {
      content: "",
      alertDate: "",
      alertTime: ""
    };
  };
  submit() {
    const group = this.route.snapshot.paramMap.get("group") || "default";
    this.todoSvc.createTodo({
      group: group,
      content: this.todo.content,
      alertDate: `${this.todo.alertDate}`,
      completed: false,
      createDate: new Date().toISOString()
    }).then(item => {
      this.todo = this.getEmptyTodo();
    });
  }
}
