import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { PubSubService } from '../services/pub-sub.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  groups: Array<TodoGroup> = [];
  constructor(
    private todoSvc: TodoService,
    private route: ActivatedRoute,
    private location: Location,
    private hubSvc: PubSubService
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
  selectGroup(group: TodoGroup) {
    this.groups.forEach(g => g.active = false);
    group.active = true;
    this.location.go(`/todo/${group.name}/list`);
  }
}

class TodoGroup {
  name: string;
  active: boolean
}