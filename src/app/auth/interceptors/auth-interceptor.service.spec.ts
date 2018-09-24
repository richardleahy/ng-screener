import { TestBed, inject } from '@angular/core/testing';

import { AuthInterceptorService } from './auth-interceptor.service';
import { StorageService } from '../../core/services/storage.service';
import {HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('AuthInterceptorService', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService, 
          multi:true
        },
        {provide: StorageService, useValue: storageServiceSpy},
        {provide: AuthService, useValue: authSpy}
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    authServiceSpy = TestBed.get(AuthService);
    httpClient = TestBed.get(HttpClient);

  });

  it('should add an Authorization header if authenticated',() => {
    authServiceSpy.getToken.and.returnValue('token');
    httpClient.get('/').subscribe();
    const req = httpTestingController.expectOne('/');
    expect(req.request.headers.has('Authorization')).toBe(true);
  });

  it('should add an Authorization header with correct token if authenticated',() => {
    authServiceSpy.getToken.and.returnValue('token');
    httpClient.get('/').subscribe();
    const req = httpTestingController.expectOne('/');
    expect(req.request.headers.get('Authorization')).toBe(
      'Token token'
    );
  });
});
