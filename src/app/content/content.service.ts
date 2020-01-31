import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {
    console.log('content service working');
  }

  getCards(){
    this.http.get('https://dahez-api.herokuapp.com/content').subscribe(data => {
      console.log(data);
    })
  }
}
