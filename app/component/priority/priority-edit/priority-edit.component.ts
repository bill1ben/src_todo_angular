import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PriorityService} from '../../../service/priority.service';
import {Priority} from '../../../class/priority';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-priority-edit',
  templateUrl: './priority-edit.component.html',
  styleUrls: ['./priority-edit.component.css']
})
export class PriorityEditComponent implements OnInit {

  priority: Priority;
  priorityForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private priorityService: PriorityService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.activatedRoute.params
      .subscribe( (params) => {
        const priorityId = params.id;
        this.priorityService.getOnePriority(priorityId)
          .subscribe( (priority: Priority) => {
            this.priority = priority;
            this.priorityForm = this.fb.group({
              name : [priority.name, Validators.required],
              value : [priority.value, Validators.required]
            });

          });

      });
  }

  ngOnInit() {
  }

  save(changePage: boolean) {
    const val = this.priorityForm.value;
    const priorityId = this.priority.id;
    this.priorityService.editPriority(priorityId, val.name, val.value)
      .subscribe( (priority: Priority) => {
          if (changePage) {
            this.router.navigate(['priority/list']);
          }
      });
  }
}
