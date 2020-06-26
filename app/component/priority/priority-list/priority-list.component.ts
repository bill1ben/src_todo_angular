import {Component, Input, OnInit} from '@angular/core';
import {Priority} from '../../../class/priority';
import {PriorityService} from '../../../service/priority.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.component.html',
  styleUrls: ['./priority-list.component.css']
})
export class PriorityListComponent implements OnInit {

  loading = true;
  priorities: Priority[];
  constructor(
    private priorityService: PriorityService,
  ) { }

  ngOnInit() {
    this.priorityService.getAllPriorities()
      .then( (data: Priority[]) => {
        this.priorities = data;
        this.loading = false;
      });
  }
  deletePriority(id: number) {
    this.priorityService.delete(id)
      .subscribe( () => {
        const index = this.priorities
          .findIndex( (priority: Priority) => {
            return priority.id === id;
          });
        this.priorities.splice(index, 1);
      });
  }

}
