import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {

  }

  getTags() {
    return this.http.get('https://dahez-api.herokuapp.com/tag/list');
  }
}
