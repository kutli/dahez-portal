import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from 'src/app/util/generics/generic.service';
import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService extends GenericService<Tag> {

  constructor(protected http: HttpClient) {
    super(http, 'tag');
  }

  getTags() {
    return this.http.get('https://dahez-api.herokuapp.com/tag/list');
  }
}
