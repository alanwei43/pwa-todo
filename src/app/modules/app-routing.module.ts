import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from "../todo-list/todo-list.component";
import { TodoCreateComponent } from "../todo-create/todo-create.component";

const routes: Routes = [
  { path: 'todo/list/:group', component: TodoListComponent },
  { path: 'todo/create', component: TodoCreateComponent },
  { path: 'todo/create/:group', component: TodoCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
