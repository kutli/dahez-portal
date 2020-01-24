import { UtilFunctions } from './../util-functions';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pageable, PageableConstants } from './pageable.model';
import { map } from 'rxjs/operators';

export abstract class GenericService<T> {

  /**
   * Constructor to create a new instance of GenericService
   * @param http HttpClient
   * @param objectUrl url
   */
  constructor(protected http: HttpClient,
              protected objectUrl: string) { }

  /**
   * Get pageable list of objects from API
   * @param filter string - string to filter the list by query
   * @param page number - Page number
   * @param extras string - Extra string from html url encoded request
   * @return Observable<Pageable<T>> Observable list of objects
   */
  getPageable(filter = '', page: number, extras: string = ''): Observable<Pageable<T>> {
    if (filter) {
      filter = encodeURI(`&q=${filter}`);
    }
    return this.http.get<Pageable<T>>(`${this.objectUrl}?page=${page - 1}${filter}${extras}`)
    .pipe(
      map((response: Pageable<T>) => response ? response : UtilFunctions.deepClone(PageableConstants.EMPTY_PAGEABLE)));
  }

  /**
   * Get list of objects from API
   * @return Observable<any> Observable list of objects
   */
  getList(): Observable<any> {
    return this.http.get<any>(`${this.objectUrl}/list`);
  }

  /**
   * Get object by ID from API
   * @param id string - Object ID
   * @return Observable<any> Observable of object
   */
  getObject(id: string): Observable<any> {
    return this.http.get<any>(`${this.objectUrl}/${id}`);
  }

  /**
   * Create new object
   * @param obj any - Object to create
   * @return Observable<any> Observable of object
   */
  createObject(obj: any): Observable<any> {
    return this.http.post<any>(this.objectUrl, obj);
  }

  /**
   * Edit an existing object
   * @param obj any - Object to update
   * @return Observable<any> Observable of object
   */
  updateObject(obj: any): Observable<any> {
    return this.http.put<any>(`${this.objectUrl}/${obj.id}`, obj);
  }

  /**
   * Delete an object
   * @param id string - Object ID
   * @return Observable<any> Observable of object
   */
  deleteObject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.objectUrl}/${id}`);
  }
}

