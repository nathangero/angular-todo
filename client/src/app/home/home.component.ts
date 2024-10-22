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

  async ngOnInit() {
    await this.getAllTodos();
  }

  async getAllTodos(): Promise<void> {
    try {
      const response = await fetch("http://localhost:3001/allTodos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const status = response.status;
      if (status !== 200) {
        console.error("Couldn't get all todos");
        return;
      }

      const results = await response.json();
      // console.log(results)
      this.updateTodos(results);
      // console.log(this.todos);

    } catch (error: any) {
      console.error(error);
    }
  }
}
