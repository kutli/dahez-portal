import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user.model';
import { Constants } from './../util/constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Token } from './models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean;
  private time = Constants.HOUR_HALF_TIME;
  private currentUser: User;
  private userSource = new BehaviorSubject<User>(null);
  public user = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  public isLoged(): boolean {
    const token = localStorage.getItem(Constants.TOKEN_NAME);
    const expireTime =  localStorage.getItem(Constants.TOKEN_EXPIRE_NAME);
    if (token && expireTime && !this.isExpired(expireTime)) {
      return true;
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  private setUser(user: User): void {
    this.currentUser = user;
    this.userSource.next(user);
  }

  public getUserInfo(): Observable<User> {
    return this.http.get<User>('oauth/User')
    .pipe(tap(user => this.setUser(user)));
  }

  /**
   * This method return a cosntructed httpHeaders with the current token
   */
  public getHeaders(): HttpHeaders {
    const token = localStorage.getItem(Constants.TOKEN_NAME);
    const headers = new HttpHeaders({ 'Authorization' :  `Bearer ${token}`});
    return headers;
  }

  /**
   * Obtain authorization token for a given credentials
   * @param email - Email
   * @param password - password
   */
  public getToken(user: string, password: string): Observable<Token> {
    const params = this.getParamsLogin(user, password);
    return this.http.post<Token>('oauth/token', params)
    .pipe(tap(token => this.saveToken(token)));
  }

  /**
   * This method sends a refresh token to the API in order to obtain a new one
   * @param refreshToken Token to send to the API
   */
  public refreshToken(refreshToken: string): Observable<Token> {
    const params = this.getParamsRefresh(refreshToken);
    return this.http.post<Token>('oauth/token', params)
    .pipe(tap(token => this.saveToken(token)));
  }

  /**
   * Remove token from backend
   * @param userId User id
   */
  public revokeToken(userId?: number): void {
    if (localStorage.getItem(Constants.TOKEN_NAME)) {
      this.http.delete('oauth/user/token').subscribe();
    }
    this.removeTokenInfo();
  }

  /**
   * remove token info
   */
  private removeTokenInfo(): void {
    this.userSource.next(null);
    this.isLoggedIn = false;
    localStorage.clear();
  }

  /**
   * This method creates the formData for the refresh tokeb
   * @param refreshToken - String of the refresh token
   */
  private getParamsRefresh(refreshToken: string): FormData {
    const params: FormData = new FormData();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    return params;
  }

  /**
   * This method will save the info if the token in the local storage of the app
   * @param token Token from AUTH
   */
  private saveToken(token: Token): void {
    this.isLoggedIn = true;
    localStorage.setItem(Constants.TOKEN_NAME, token.access_token);
    localStorage.setItem(Constants.TOKEN_REFRESH_NAME, token.refresh_token);
    localStorage.setItem(Constants.TOKEN_EXPIRE_NAME, this.getExpirationTime(token));
    this.getUserInfo().subscribe();
  }

  /**
   * This method deserializes the payload in a token to obtain the expiration time
   */
  private getExpirationTime(token: Token): string {
    let payload = token.access_token.split('.')[1];
    payload = window.atob(payload);
    const payloadObject = JSON.parse(payload);
    return (payloadObject.exp * 1000).toString();
  }

  /**
   * This method creates the formData for the login
   * @param user User in location user format
   * @param password Users password
   */
  protected getParamsLogin(user: string, password: string): FormData {
    const params = new FormData();
    params.append('grant_type', 'password');
    params.append('username',  `${user}`);
    params.append('password', password);
    params.append('client_id', 'dahez_portal_client');
    params.append('scope', 'openid');
    return params;
  }

  /**
   * This method check the token expiration time
   * @param expireTime The expire time of the token
   */
  private isExpired(expireTime: string): boolean {
    return (parseFloat(expireTime) - new Date().getTime() < this.time);
  }
}



