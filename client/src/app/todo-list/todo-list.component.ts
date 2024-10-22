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

}
