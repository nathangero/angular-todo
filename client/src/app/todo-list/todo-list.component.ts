import { CommonModule } from "@angular/common";
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  INDEX_TODO_NAME = 0;
  INDEX_TODO_COMPLETION = 1;

  @Input() todos!: { [key: number]: [string, boolean] };
  @Input() updateTodos!: (todos: { [key: number]: [string, boolean] }) => void;

  ngOnInit() {
    this.getAllTodos();
  }

  async getAllTodos() {
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
