import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../../service/todo.service';
import {Todo} from '../../../class/todo';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public loading = true;
  public todos: Todo[];
  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // RECUPERATION DES TODOS !
    this.todoService.getAllTodo()
      .subscribe( (todos: Todo[]) => {
        this.todos = todos;
        this.loading = false;
      });
  }

  isNotConnected() {
    return !this.authService.isConnected();
  }

  switchDone(todo: Todo) {
    todo.loading = true;
    const data = { done : todo.done };
    this.todoService.patchDoneTodo(todo.id, data).subscribe( () => {
      todo.loading = false;
    });
  }
}
