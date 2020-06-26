import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from '../class/todo';
import {ParseArgumentException} from '@angular/cli/models/parser';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    if (!value || value.length === 0) {
      return ;
    }
    const attr = args[0];
    if (!attr) {
      console.error('OrderByPipe need a value attribute defined');
    }

    value = value.sort( (a: any, b: any) => {
      return a[attr] < b[attr] ? 1 : -1;
    });
    return value;
  }

}
