import { Component, OnInit } from '@angular/core';
import {Label} from '../../../class/label';
import {LabelService} from '../../../service/label.service';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent implements OnInit {

  loading = true;
  labels: Label[];
  constructor(
    private labelService: LabelService
  ) {}

  ngOnInit() {
    this.labelService.getAllLabels()
      .subscribe( ( labels: Label[]) => {
        this.labels = labels;
        this.loading = false;
      });
  }

  deleteLabel(id: number) {
    this.labelService.delete(id)
      .subscribe( () => {
        const index = this.labels
          .findIndex( (label: Label) => {
            return label.id === id;
          });
        this.labels.splice(index, 1);
      });
  }
}
