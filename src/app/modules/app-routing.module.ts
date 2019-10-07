import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from "../todo-list/todo-list.component";
import { TodoCreateComponent } from "../todo-create/todo-create.component";

const routes: Routes = [
  { path: 'todo/:group', component: TodoListComponent },
  { path: 'todo/:group/list', component: TodoListComponent },
  { path: 'todo/:group/create', component: TodoCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
