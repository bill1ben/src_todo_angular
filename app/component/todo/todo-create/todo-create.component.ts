import {Component, OnInit} from '@angular/core';
import {Todo} from '../../../class/todo';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PriorityService} from '../../../service/priority.service';
import {LabelService} from '../../../service/label.service';
import {CommentService} from '../../../service/comment.service';
import {Priority} from '../../../class/priority';
import {Label} from '../../../class/label';
import {TodoService} from '../../../service/todo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  todo: Todo;
  loading = true;
  todoForm: FormGroup;
  priorities: Priority[];
  labels: Label[];

  constructor(
    private fb: FormBuilder,
    private priorityService: PriorityService,
    private labelService: LabelService,
    private commentService: CommentService,
    private todoService: TodoService,
    private router: Router
  ) {
    this.todo = new Todo();
  }

  ngOnInit() {
    const priorityPromise = this.priorityService.getAllPriorities();
    const labelPromise = this.labelService.getAllLabels().toPromise();

    this.todoForm = this.fb.group({
      priority: [null, Validators.required],
      title : [null, Validators.compose( [Validators.required, Validators.minLength(3)])],
      description: [null],
      done: [this.todo.done],
      labels: new FormArray([])
    });

    Promise.all([priorityPromise, labelPromise])
      .then( (data) => {
        this.priorities = data[0];
        this.labels = data[1];
        this.labels.forEach( (o, i) => {
          const control = new FormControl(false);
          (this.todoForm.controls.labels as FormArray).push(control);
        });
        this.loading = false;

      });


  }

  save() {
    const val = this.todoForm.value;
    const labels = [];
    val.labels.map( (selected, i) => {
      if (selected) {
        labels.push(this.labels[i].id);
      }
    });
    const todo = {
      title : val.title,
      description : val.description,
      done: val.done,
      priority: val.priority,
      labels
    };
    this.loading = true;
    this.todoService.create( todo ).subscribe( () => {
      this.router.navigate(['']);
    });
  }
}
