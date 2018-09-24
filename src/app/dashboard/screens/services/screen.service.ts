import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';
import { map, catchError } from 'rxjs/operators';
import { Screen } from '../screen';

/**
 * Class representing a ScreenService.
 */
@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private screenUrl = 'screener/screens/';

  /**
   * Create a ScreenService.
   * @param {HttpClient} http - Injected Http client.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get candidate score.
   * @param {number} candidate_id - Candidate id.
   * @param {number} id - Screen id.
   * @returns {HttpResult}
   */
  getScore(candidate_id: number, id: number): Observable<HttpResult> {
    
    const url = `${this.screenUrl}${id}/score/?candidate=${candidate_id}`;
    
    return this.http.get<HttpResult>(url)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError(this.handleError())
      );
  }

  /**
   * Get screen.
   * @param {number} id - Screen id.
   * @returns {HttpResult}
   */
  getScreen(id: number): Observable<HttpResult> {
    
    const url = `${this.screenUrl}${id}/`;
    
    return this.http.get<HttpResult>(url)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError(this.handleError())
      );
  }

  /**
   * Delete screen.
   * @param {Screen} screen - Screen to delete.
   * @returns {HttpResult}
   */
  deleteScreen(screen: Screen): Observable<HttpResult> {
    
    const id = screen.pk;
    const url = `${this.screenUrl}${id}/`;
    
    return this.http.delete<HttpResult>(url)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError(this.handleError())
      );

  }

  /**
   * Update screen.
   * @param {Screen} screen - Screen to update.
   * @returns {HttpResult}
   */
  updateScreen(screen: Screen): Observable<HttpResult> {
    
    const id = screen.pk;
    const url = `${this.screenUrl}${id}/`;
    
    return this.http.put<HttpResult>(url, screen)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError(this.handleError())
      );
  }

  /**
   * Add screen.
   * @param {Screen} screen - Screen to add.
   * @returns {HttpResult}
   */
  addScreen(screen: Screen): Observable<HttpResult> {

    const url = `${this.screenUrl}`;
    
    return this.http.post<HttpResult>(url, screen)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError(this.handleError())
      );  
  }

  /**
   * Get screens.
   * @returns {HttpResult}
   */
  getScreens(): Observable<HttpResult> {
    const url = `${this.screenUrl}`;

    return this.http.get<HttpResult>(url)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError(this.handleError())
      );
  }


  private handleError() {
    return (error: any): Observable<HttpResult> => {
      return of(
        new HttpResult(
          false,
          error
        )
      );
    }
  }
}
