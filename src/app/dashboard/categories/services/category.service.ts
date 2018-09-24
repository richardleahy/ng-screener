import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResult } from '../../../core/services/http-result';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from '../category';

/**
 * Class representing a CategoryService.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // rest api
  private categoryUrl = 'screener/categories/';

  /**
   * Create a CategoryService.
   * @param {HttpClient} http - Injected Http client. 
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Edit category
   * @param {Category} category - Category to edit.
   * @returns {HttpResult}
   */
  editCategory(category: Category): Observable<HttpResult> {
    const id = category.pk;
    const url = `${this.categoryUrl}${id}/`;

    return this.http.put<HttpResult>(url, category)
      .pipe(
        // map result to HttpResult
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError((res) => {
          return this.handleError(res);
        })
      );  
  }

  /**
   * Add category
   * @param {Category} category - Category to add.
   * @returns {HttpResult}
   */
  addCategory(category: Category): Observable<HttpResult> {

    const url = `${this.categoryUrl}`;
    
    return this.http.post<HttpResult>(url, category)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError((res) => {
          return this.handleError(res);
        })
      );  
  }

  /**
   * Delete category
   * @param {Category} category - Category to delete.
   * @returns {HttpResult}
   */
  deleteCategory(category: Category): Observable<HttpResult> {
    
    const id = category.pk;
    const url = `${this.categoryUrl}${id}/`;
    
    return this.http.delete<HttpResult>(url)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError((res) => {
          return this.handleError(res);
        })
      );

  }

  /**
   * Get all categories.
   * @returns {HttpResult}
   */
  getCategories(): Observable<HttpResult> {

    const url = `${this.categoryUrl}`;

    return this.http.get<HttpResult>(url)
      .pipe(
        map((res) => {
          res = new HttpResult(
            true,
            res
          );
          return res;
        }),
        catchError((res) => {
          return this.handleError(res);
        })
      );
  }

  /**
   * Handle Http errors.
   * @param res 
   */
  private handleError(res: any): Observable<HttpResult> {
    return of(
      new HttpResult(
        false,
        res
      )
    );
  }

}
