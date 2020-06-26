import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from '../class/todo';

@Pipe({
  name: 'orderByPriority'
})
export class OrderByPriorityPipe implements PipeTransform {

  transform(value: Todo[]|null, ...args: any[]): any {
    if (!value) { return ; }
    value = value.sort( (a: Todo, b: Todo) => {
      return a.priority.value < b.priority.value ? 1 : -1;
    });
    return value;
  }

}
