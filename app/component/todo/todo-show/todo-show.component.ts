import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../../class/todo';
import {TodoService} from '../../../service/todo.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-todo-show',
  templateUrl: './todo-show.component.html',
  styleUrls: ['./todo-show.component.css']
})
export class TodoShowComponent implements OnInit {

  @Input() todo: Todo;
  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
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
