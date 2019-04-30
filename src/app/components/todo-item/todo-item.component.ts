import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }


  /**
   * Set dynamic classes
   */
  setClasses(): object {
    let classes = {
      'todo-item': true,
      'todo-item--completed': this.todo.completed
    }
    return classes;
  }

  /**
   * 
   * @param todo 
   */
  onToggle(todo: Todo): void {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  /**
   * 
   * @param todo 
   */
  onDelete(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }
}
