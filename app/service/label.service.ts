import { Injectable } from '@angular/core';
import {Globals} from '../globals';
import {HttpClient} from '@angular/common/http';
import {Priority} from '../class/priority';
import {Label} from '../class/label';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  uri = `${Globals.APP_API_URL}/label`;
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllLabels() {
    return this.httpClient.get<Label[]>(`${this.uri}`);
  }

  public getOneLabel(id: number) {
    return this.httpClient.get(`${this.uri}/${id}`);
  }

  public editLabel(id: number, title: string) {
    return this.httpClient.put(`${this.uri}/${id}/edit`, { title });
  }

  public create(title: string) {
    return this.httpClient.post(`${this.uri}/create`, { title });
  }

  public delete(id: number) {
    return this.httpClient.delete(`${this.uri}/${id}/delete`);
  }
}
