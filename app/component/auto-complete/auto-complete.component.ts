import {AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {Priority} from '../../class/priority';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {PriorityCreateComponent} from '../priority/priority-create/priority-create.component';
import {MatDialogRef} from '@angular/material/dialog/typings/dialog-ref';
import { OrderByPipe } from '../../pipe/order-by.pipe';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit, AfterContentChecked {

  @Input() placeholder = '';
  @Input() filterFn: any;
  @Input() displayFn: any;
  @Input() filterMap: any;
  @Input() required: boolean;
  @Input() parentModel: any;
  @Input() listToAdd: any[];
  @Input() myControl: FormControl;
  @Input() arrayPromise: any;
  @Input() dialogComponentName: string;
  @Input() creationAllowed: boolean;
  @Input() callBackDialogFn: any;
  @Input() pipeAttributeOrderBy: string

  dialogRef: MatDialogRef<any>;
  loading = true;
  buttonAppears = false;
  listOfElements: any[];
  createButton = false;
  @Output() addElement = new EventEmitter<any>();
  filteredElements: Observable<any[]>;

  constructor(
    private cdref: ChangeDetectorRef,
    private orderByPipe: OrderByPipe,
    public dialog: MatDialog,
  ) {
  }
  ngOnInit() {
    this.createButton = this.creationAllowed ? this.creationAllowed : false;
    this.arrayPromise().then( (data: any[]) => {
      this.listOfElements = this.orderByPipe.transform(data, this.pipeAttributeOrderBy);
      this.loading = false;
      this.filteredElements = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(this.filterMap),
          map( (name: any) => name ? this._filter(name) : this.listOfElements.slice())
        );
    });
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  private _filter(name: string): Priority[] {
    if (name.length > 1) {
      const filterValue = name.toLowerCase();
      const filteredList = this.listOfElements.filter(this.filterFn(filterValue));
      this.buttonAppears = filteredList.length === 0;
      return filteredList;
    }
    this.buttonAppears = false;
    return this.listOfElements;
  }
  reset() {
    setTimeout( () => {
      if (typeof this.myControl.value === 'string') {
        this.addElement.emit(null);
      }
    }, 100);
  }
  sendToParent() {
    setTimeout( () => {
      if (typeof this.parentModel !== 'string') {
        this.addElement.emit(this.myControl.value);
      }
    }, 500);
  }
  openModal() {
    this.dialogRef = this.callBackDialogFn({
      data: {
        value: this.myControl.value
      }
    });
    this.dialogRef.afterClosed().subscribe( (result: any) => {
      if (result && result.valid && result.valid === true) {
        const element = result.data;
        this.listOfElements.push(element);
        this.listOfElements = this.orderByPipe.transform(this.listOfElements, this.pipeAttributeOrderBy);
        this.parentModel = element;
        this.sendToParent();
      }
    });
  }
}
