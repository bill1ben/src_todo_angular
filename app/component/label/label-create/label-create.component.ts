import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LabelService} from '../../../service/label.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-label-create',
  templateUrl: './label-create.component.html',
  styleUrls: ['./label-create.component.css']
})
export class LabelCreateComponent implements OnInit {

  labelForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private labelService: LabelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.labelForm = this.fb.group({
      title : ['', Validators.required]
    });
  }

  save() {
    const val = this.labelForm.value;
    this.labelService.create(val.title)
      .subscribe( () => {
        this.router.navigate(['/label/list']);
      });
  }
}
