import { async } from '@angular/core/testing';
import { Errors } from './error.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errors = Errors.ERROR_TYPES;
  private defaultError = 'Unknow error, please verify your connection or call support';

  constructor() { }

  /**
   * Error handler that returns a human readable error
   * @param error The error object
   */
  public handleError(error: any): string {
    if (error.error instanceof Blob) {
      this.handleBlobError(error)
      .then( response => {
        const handledError = this.errors.filter(err => err.error === response);
        if (handledError.length > 0) {
          return handledError[0].translated;
        }
      });
    }
    if (error && error.error && error.error.error_description) {
      const handledError = this.errors.filter(err => err.error === error.error.error_description);
      if (handledError.length > 0) {
        return handledError[0].translated;
      }
    } else if (error && error.error && error.error.error.errorMessage) {
      const handledError = this.errors.filter(err => err.error === error.error.error.errorMessage);
      if (handledError.length > 0) {
        return handledError[0].translated;
      }
    }
    return this.defaultError;
  }

  /**
   * Hnalde errors in blob format
   * @param error The error in blob format
   */
  handleBlobError(error: any): Promise<string> {
    return (async () => await (new Response(error.error).text()))()
    // tslint:disable-next-line: no-string-literal
    .then(res => JSON.parse(res)['errorMessage'] == null ? 'ERROR.DEFAULT' : JSON.parse(res)['errorMessage']);
  }
}
