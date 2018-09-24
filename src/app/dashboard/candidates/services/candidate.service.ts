import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';
import { map, catchError } from 'rxjs/operators';
import { Candidate } from '../candidate';

/** Class representing a CandidateService */
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  // rest api
  private candidateUrl = 'screener/candidates/';

  /**
   * Create a CandidateService.
   * @param {HttpClient} http - Injected Http client.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get requested candidate.
   * @param {number} id - Candidate id.
   * @returns {HttpResult}
   */
  getCandidate(id: number): Observable<HttpResult> {
    
    const url = `${this.candidateUrl}${id}/`;
    
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
   * Delete requested candidate.
   * @param {Candidate} candidate - Candidate to delete.
   * @returns {HttpResult}
   */
  deleteCandidate(candidate: Candidate): Observable<HttpResult> {
    
    const id = candidate.pk;
    const url = `${this.candidateUrl}${id}/`;
    
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
   * Update requested candidate.
   * @param {Candidate} candidate - Candidate to update.
   * @returns {HttpResult}
   */
  updateCandidate(candidate: Candidate): Observable<HttpResult> {
    
    const id = candidate.pk;
    const url = `${this.candidateUrl}${id}/`;
    
    return this.http.put<HttpResult>(url, candidate)
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
   * Add requested candidate.
   * @param {Candidate} candidate - Candidate to add.
   * @returns {HttpResult}
   */
  addCandidate(candidate: Candidate): Observable<HttpResult> {

    const url = `${this.candidateUrl}`;
    
    return this.http.post<HttpResult>(url, candidate)
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
   * Get requested candidates.
   * @returns {HttpResult}
   */
  getCandidates(): Observable<HttpResult> {
    const url = `${this.candidateUrl}`;

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
   * Handle Http errors.
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
