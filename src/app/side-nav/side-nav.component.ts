import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  groups: Array<{ name: string, active: boolean }> = [];
  constructor(
    private todoSvc: TodoService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadTodoGroups();
  }
  async loadTodoGroups() {
    this.groups = (await this.todoSvc.getTodoGroups()).map(item => ({
      name: item,
      active: false
    }));
  }
}
