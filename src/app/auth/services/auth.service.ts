import { Injectable } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { HttpResult } from '../../core/services/http-result';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { STORAGE_TOKEN_KEY } from '../auth.constants';

/** Http request options. */
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/** Class representing an AuthService. */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** service url. */
  private authUrl = 'rest-auth';

  /**
   * Create an AuthService.
   * @param {StorageService} storageService - Injected storage service.
   * @param {HttpClient} http - Injected Http client.
   */
  constructor(
    private storageService: StorageService,
    private http: HttpClient 
  ) { }

  /**
   * Get the auth token.
   * @returns {string} The auth token.
   */
  getToken() {
    return this.storageService.get(STORAGE_TOKEN_KEY);
  }

  /**
   * Remove the auth token.
   */
  removeToken() {
    this.storageService.clear(STORAGE_TOKEN_KEY);
  }

  /**
   * Sets the auth token.
   * @param {HttpResult} res - Http result object.
   */
  setToken(res: HttpResult) {
    this.storageService.set(
      STORAGE_TOKEN_KEY,
      res.getResponse()['key']
    );
  }

  /**
   * Log user in.
   * @returns {HttpResult} Observable
   */ 
  login(data: any): Observable<HttpResult> {
    
    const loginUrl  = `${this.authUrl}/login/`;

    return this.http.post<HttpResult>(loginUrl, data, httpOptions)
      .pipe(
        // map result to HttpResult
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          // set token in local storage
          this.setToken(res);
          return res;
        }),
        catchError((res) => {
          return this.handleError(res)
        })
      );
  }

  /**
   * Log user out.
   * @returns {HttpResult} Observable
   */
  logout(): Observable<HttpResult> {
    const logoutUrl  = `${this.authUrl}/logout/`;
    return this.http.post<HttpResult>(logoutUrl, {}, httpOptions)
      .pipe(
        // map result to HttpResult
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          // remove token from local storage.
          this.removeToken();
          return res;
        }),
        catchError((res) => {
          return this.handleError(res);
        })
      );

  }

  private handleError(res: any): Observable<HttpResult> {
    return of(
      new HttpResult(
        false,
        res
      )
    )
  }
}
