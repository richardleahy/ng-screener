import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';
import { map, catchError } from 'rxjs/operators';

/** Class representing an AnswerService */
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  // rest url
  private answerUrl = 'screener/answers/';

  /**
   * Create an AnswerService.
   * @param {HttpClient} http - Injected Http client.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get the requested current answer for a question / candidate.
   * @param {number} questionId - Question id.
   * @param {number} id - Candidate id.
   */
  getCurrentAnswer(questionId: number, id: number): Observable<HttpResult> {
    
    const url = `${this.answerUrl}?question=${questionId}&candidate=${id}`;
    
    return this.http.get<HttpResult>(url)
      .pipe(
        // map result to HttpResult
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
   * Add candidate answer.
   * @param {any} answer - Candidate answer. 
   */
  addAnswer(answer: any): Observable<HttpResult> {
    
    const url = `${this.answerUrl}`;
    
    return this.http.post<HttpResult>(url, answer)
      .pipe(
        // map result to HttpResult
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
   * Update candidate answer.
   * @param {any} answer - Candidate answer. 
   * @param {number} id - Answer id.
   */
  updateAnswer(answer: any, id: number): Observable<HttpResult> {
    
    const url = `${this.answerUrl}${id}/`;
    
    return this.http.put<HttpResult>(url, answer)
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
   * Handle Http error. 
   * @returns {HttpResult}
   */
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
