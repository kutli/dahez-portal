import { Constants } from './../util/constants';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { ErrorService } from './../util/error-service/error.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
/**
 * Author: Saul Ruiz
 * Custom Interceptor
 */
export class AuthInterceptor implements HttpInterceptor {

    constructor(protected authService: AuthService,
                protected errorService: ErrorService,
                protected router: Router) { }

    protected basicToken = 'Basic YXJhX3BvcnRhbF9jbGllbnQ6n1JIJVRMREVERFdXSjdVRg==';
    private GRANT_TYPE_AUTH = 'Authorization';

    /**
     * Function to handle the incoming HTTP errors
     */
    private handleError = (error: HttpErrorResponse) => {
        if (environment.production) {
            console.log(error);
        }
        if (error.status === 401) {
            this.authService.revokeToken();
            this.router.navigateByUrl('/login');
        }
        if (error.status === 403 && !error.url.match(/uaa\/oauth\/token/ig)) {
            this.router.navigateByUrl('/forbbiden');
        }
        const parsedError = this.errorService.handleBlobError(error);
        return throwError({ parsed: parsedError, original: error});
    }

    /**
     * This method handles every auth request
     * @param request HttpRequest
     * @param token String token
     */
    private handleAuthRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
        if (request.method === 'DELETE') {
            request = request.clone({
                url:  `${environment.apiUrl}${request.url}`,
                headers: request.headers.set(this.GRANT_TYPE_AUTH,  `Bearer ${token}`)
            });
        } else if (request.url.match(/.*user.*/gm)) {
            request = request.clone({
                url:  `${environment.apiUrl}user`,
                headers: request.headers.set(this.GRANT_TYPE_AUTH,  `Bearer ${token}`)
            });
        } else {
            request = request.clone({
                url:  `${environment.apiUrl}${request.url}`,
                headers: request.headers.set(this.GRANT_TYPE_AUTH, this.basicToken)
            });
        }
        return request;
    }
    /**
     * This interceptor adds the url for the request and the headers, also it handle errors
     * @param request HttpRequest to be handled
     * @param next HttpHandler Handler function
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(Constants.TOKEN_NAME);
        // This will handle the oauth request
        if (request.url.match(/.*oauth.*/gm)) {
            request = this.handleAuthRequest(request, token);
        } else if (token) {
            request = request.clone({
                url:  `${environment.apiUrl}${request.url}`,
                headers: request.headers.set(this.GRANT_TYPE_AUTH,  `Bearer ${token}`)
            });
        }
        return next.handle(request)
        .pipe(catchError(this.handleError));
    }
}
