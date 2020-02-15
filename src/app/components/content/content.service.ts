import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/util/generics/generic.service';
import { Content } from '../content/content.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService extends GenericService<Content>{

  constructor(protected http: HttpClient) {
    super(http,  `${environment.apiUrl}content` );
  }

  getRandom(): Observable<Array<Content>> {
    return this.http.get<Array<Content>>('https://dahez-api.herokuapp.com/content/random');
  }
}
