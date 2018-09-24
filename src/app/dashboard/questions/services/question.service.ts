import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';
import { map, catchError } from 'rxjs/operators';
import { Question } from '../question';

/**
 * Class representing a QuestionService.
 */
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // rest url.
  private questionUrl = 'screener/questions/';

  /**
   * Create a QuestionService.
   * @param {HttpClient} http - Injected http client. 
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get question.
   * @param {number} id - Question id.
   * @returns {HttpResult}
   */
  getQuestion(id: number): Observable<HttpResult> {
    
    const url = `${this.questionUrl}${id}/`;
    
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
   * Delete question.
   * @param {Question} question - Question to delete.
   * @returns {HttpResult}
   */
  deleteQuestion(question: Question): Observable<HttpResult> {
    
    const id = question.pk;
    const url = `${this.questionUrl}${id}/`;
    
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
   * Update question.
   * @param {Question} question - Question to update.
   * @returns {HttpResult}
   */
  updateQuestion(question: Question): Observable<HttpResult> {
    
    const id = question.pk;
    const url = `${this.questionUrl}${id}/`;
    
    return this.http.put<HttpResult>(url, question)
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
   * Add question.
   * @param {Question} question - Question to add.
   * @returns {HttpResult}
   */
  addQuestion(question: Question): Observable<HttpResult> {

    const url = `${this.questionUrl}`;
    
    return this.http.post<HttpResult>(url, question)
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
   * Get questions.
   * @returns {HttpResult}
   */
  getQuestions(): Observable<HttpResult> {
    const url = `${this.questionUrl}`;

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
