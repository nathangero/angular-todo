import { Component } from '@angular/core';
import { TodoFormComponent } from "../todo-form/todo-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  todos: { [key: number]: [string, boolean] } = {};
}
