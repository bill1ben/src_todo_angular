import {Priority} from './priority';
import {Label} from './label';
import {Comment} from './comment';
import {Urlimage} from './urlimage';

export class Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  priority: Priority | null;
  urlimage: Urlimage;
  labels: Label[];
  comments: Comment[];
  loading: boolean;

  constructor() {
    this.loading = false;
    this.done = false;
  }
}
