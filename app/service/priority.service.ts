import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import {Priority} from '../class/priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  uri = `${Globals.APP_API_URL}/priority`;
  allPrioritiesPromise: Promise<Priority[]> | null;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllPriorities(force = false) {
    if (this.allPrioritiesPromise && !force) {
      return Promise.resolve(this.allPrioritiesPromise);
    }
    this.allPrioritiesPromise = this.httpClient.get<Priority[]>(`${this.uri}`).toPromise();
    return this.allPrioritiesPromise;
  }

  public getOnePriority(id: number) {
    return this.httpClient.get(`${this.uri}/${id}`);
  }

  public createPriority(name: string, value: number) {
    return this.httpClient.post( `${this.uri}/create`, { name, value }  ).toPromise().then((data) => {
      this.allPrioritiesPromise = null;
      return data;
    });
  }

  public editPriority(id: number, name: string, value: number) {
    return this.httpClient.put(`${this.uri}/${id}/edit`, { name, value }).pipe((data) => {
      this.allPrioritiesPromise = null;
      return data;
    });
  }
  public delete(id: number) {
    return this.httpClient.delete(`${this.uri}/${id}/delete`).pipe((data) => {
      this.allPrioritiesPromise = null;
      return data;
    });
  }
}
