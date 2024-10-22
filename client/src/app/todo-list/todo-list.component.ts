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


  async onClickDeleteTodo(timestamp: number) {
    try {
      const response = await (fetch(`http://localhost:3001/${timestamp}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }));

      const status = response.status;
      if (status !== 200) {
        console.error("Couldn't delete todo");
        return;
      }

      const result = await response.json();
      this.updateTodos(result);

    } catch (error: any) {
      console.error(error);
    }
  }
}
