import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Todo} from '../../class/todo';
import {TodoService} from '../../service/todo.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  action: string;
  todo: Todo;
  loading: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService
  ) {
    this.loading = true;
    this.activatedRoute.params
      .subscribe( (params) => {
        this.action = params.verb;
        if ( this.action === 'create') {
          this.loading = false;
          return;
        }
        return this.todoService.getOneTodo(params.id)
          .subscribe( (todo: Todo) => {
            this.todo = todo;
            this.loading = false;
          } );
      });
  }

  ngOnInit() {
  }

}
