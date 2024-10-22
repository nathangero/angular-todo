import { Component } from '@angular/core';
import { TodoFormComponent } from "../todo-form/todo-form.component";
import { TodoListComponent } from "../todo-list/todo-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoFormComponent, TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  todos: { [key: number]: [string, boolean] } = {};
  updateTodos(todos: { [key: number]: [string, boolean] }) {
    this.todos = todos;
  }
}
