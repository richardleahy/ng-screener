import { Injectable } from '@angular/core';
import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest 
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Class representing an AuthInterceptor*/
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  /**
   * Create an AuthInterceptor.
   * @param {AuthService} authService - Injected auth service. 
   */
  constructor(
    private authService: AuthService
  ) { }

  /**
   * Intercept Http requests and add Authorization token.
   * @param req 
   * @param next 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (this.authService.getToken()){
      // add auth header to request.
      req = req.clone({
        setHeaders:{['Authorization']: `Token ${this.authService.getToken()}`}
      });
    }
    return next.handle(req);
  }
}
