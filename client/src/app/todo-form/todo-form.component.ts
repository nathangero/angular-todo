import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  newTodo: string = "";

  onChangeNewTodo = (value: string) => {
    // console.log("value:", value);
    this.newTodo = value;
  }

  onSubmitNewTodo = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch("http://localhost:3001/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "todo": this.newTodo })
      });

      const status = response.status;
      if (status !== 200) console.error("Couldn't create a new todo");

      const result = await response.json();

      this.newTodo = "";
    } catch (error: any) {
      console.error(error);
    }

  }
}