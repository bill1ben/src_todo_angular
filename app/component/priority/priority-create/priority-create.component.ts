import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriorityService} from '../../../service/priority.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Priority} from '../../../class/priority';

@Component({
  selector: 'app-priority-create',
  templateUrl: './priority-create.component.html',
  styleUrls: ['./priority-create.component.css']
})
export class PriorityCreateComponent implements OnInit {

  priorityForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private priorityService: PriorityService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any | null,
    @Optional() private dialogRef: MatDialogRef<PriorityCreateComponent>
  ) {
  }

  ngOnInit() {
    this.priorityForm = this.fb.group({
      name : [ this.data && this.data.value ? this.data.value : '', Validators.required],
      value: ['', Validators.required]
    });
  }
  save() {
    const val = this.priorityForm.value;
    this.priorityService.createPriority(val.name, val.value)
      .then( (priority: Priority) => {
        if (this.data && this.dialogRef) {
          this.dialogRef.close({
            valid: true,
            data : priority
          });
        } else {
          this.router.navigate(['/priority']);
        }
      });
  }
}
