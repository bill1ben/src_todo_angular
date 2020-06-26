import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Priority} from '../../class/priority';
import {PriorityService} from '../../service/priority.service';
import {Todo} from '../../class/todo';
import {PriorityCreateComponent} from '../../component/priority/priority-create/priority-create.component';
import {MatDialog} from '@angular/material';

export function ValidateObj(control: AbstractControl) {
  if (typeof control.value === 'string') {
    return { noObject: true };
  }
  return null;
}

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})

export class TestPageComponent implements OnInit {

  formTodo: FormGroup;
  myControl: FormControl;
  todo: Todo;
  loading = true;
  priority: Priority;
  prioritiesPromise: any;
  priorityCreateComponent: string;

  constructor(
    private priorityService: PriorityService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.todo = new Todo();
    this.priorityCreateComponent = 'PriorityCreateComponent';
    this.prioritiesPromise = (bool) => this.priorityService.getAllPriorities(bool);
    this.myControl = new FormControl(null, [Validators.required, ValidateObj]);
    this.formTodo = this.fb.group({
      myControl : this.myControl
    });
  }

  setPriority($event: Priority) {
    this.todo.priority = $event;
  }

  go() {
    console.log(this.todo);
  }

  callBackMapFn(value) {
    if (!value) {
      return '';
    }
    return typeof value === 'string' ? value : value.name;
  }
  callBackFilterFn(filterValue) {
    return (option) => {
      return option.name.toLowerCase().includes(filterValue);
    };
  }
  callBackDisplayFn(data?: any): string | undefined {
    return data ? data.name : undefined;
  }

  callBackDialogFn(config) {
    return this.dialog.open(PriorityCreateComponent, config);
  }
}
