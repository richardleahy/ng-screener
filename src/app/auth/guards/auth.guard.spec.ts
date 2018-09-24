import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';

describe('AuthGuard', () => {
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerServiceSpy: jasmine.SpyObj<Router>; 
  let guard: AuthGuard;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const storageSpy = jasmine.createSpyObj('StorageService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard, 
        RouterTestingModule,
        {provide: Router, useValue: routerSpy},
        {provide: StorageService, useValue: storageSpy}
      ]
    });

    storageServiceSpy = TestBed.get(StorageService);
    routerServiceSpy = TestBed.get(Router);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  
  it('#canActivate should return true when authenticated', inject([AuthGuard], (guard: AuthGuard) =>{
    storageServiceSpy.get.and.returnValue('token');
    expect(guard.canActivate(null, null)).toBe(true);
  }));

  it('#canActivate should return false when not authenticated', inject([AuthGuard], (guard: AuthGuard) =>{
    storageServiceSpy.get.and.returnValue('');
    expect(guard.canActivate(null, null)).toBe(false);
  }));

  it('#canActivate should redirect to login page when not authenticated', inject([AuthGuard], (guard: AuthGuard) =>{
    storageServiceSpy.get.and.returnValue('');
    guard.canActivate(null, null);
    const spy = routerServiceSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/auth', 'should nav to /auth');
  }));
});
