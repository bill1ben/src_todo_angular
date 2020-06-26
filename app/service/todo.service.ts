import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import {Todo} from '../class/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private uri = `${Globals.APP_API_URL}/todo/`;
  constructor(
    private http: HttpClient
  ) { }
  public getAllTodo() {
    return this.http.get(`${this.uri}`);
  }
  public getOneTodo(id: number) {
    return this.http.get(`${this.uri}${id}`);
  }
  public patchDoneTodo(id: number, data: any) {
    return this.http.patch(`${this.uri}${id}/patch/done`, data);
  }
  public create(todo: any) {
    return this.http.post(`${this.uri}create`, todo);
  }
}
