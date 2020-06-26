import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LabelService} from '../../../service/label.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Priority} from '../../../class/priority';
import {Label} from '../../../class/label';

@Component({
  selector: 'app-label-edit',
  templateUrl: './label-edit.component.html',
  styleUrls: ['./label-edit.component.css']
})
export class LabelEditComponent implements OnInit {

  label: Label;
  labelForm: FormGroup;
  loading = true;
  constructor(
    private fb: FormBuilder,
    private labelService: LabelService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params
      .subscribe( (params) => {
        const labelId = params.id;
        this.labelService.getOneLabel(labelId)
          .subscribe( (label: Label) => {
            this.label = label;
            this.labelForm = this.fb.group({
              title : [label.title, Validators.required]
            });
            this.loading = false;
          });

      });
  }

  ngOnInit() {
  }

  save(changePage: boolean) {
    const val = this.labelForm.value;
    const labelId = this.label.id;
    this.labelService.editLabel(labelId, val.title)
      .subscribe( (label: Label) => {
        if (changePage) {
          this.router.navigate(['label/list']);
        }
      });
  }
}
