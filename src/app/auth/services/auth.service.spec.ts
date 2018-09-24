import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StorageService } from '../../core/services/storage.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpResult } from '../../core/services/http-result';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authService: AuthService;


  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['get', 'clear', 'set']);
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: StorageService, useValue: storageSpy},
        {provide: HttpClient, useValue: httpSpy},
      ]
    });

    storageServiceSpy = TestBed.get(StorageService);
    httpClientSpy = TestBed.get(HttpClient);
    authService = TestBed.get(AuthService);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('#getToken should return stubbed token', () => {
    const stubValue = 'test';
    storageServiceSpy.get.and.returnValue(stubValue);
    expect(authService.getToken()).toBe(stubValue);
  });

  it('#removeToken should remove stubbed token', () => {
    storageServiceSpy.clear.and.returnValue(null);
    authService.removeToken();
    expect(storageServiceSpy.clear.calls.count()).toBe(1);
  });

  it('#login should return token', () => {
    const stubValue = { key: "test" };
    const spy = spyOn(authService, 'setToken');
    httpClientSpy.post.and.returnValue(
      of({})
    );
    authService.login({}).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('#login should return error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400, statusText: 'Err'
    });
    httpClientSpy.post.and.returnValue(
      throwError(errorResponse)
    );
    authService.login({}).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(false);
    });
  });

  it('#logout should clear token', () => {

    const spy = spyOn(authService, 'removeToken');
    httpClientSpy.post.and.returnValue(
      of({})
    );
    
    authService.logout().subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(spy).toHaveBeenCalled();
    
  });

  it('#logout should return error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400, statusText: 'Err'
    });
    httpClientSpy.post.and.returnValue(
      throwError(errorResponse)
    );
    authService.logout().subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(false);
    });
  });
});
