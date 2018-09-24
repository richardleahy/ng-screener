import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { STORAGE_TOKEN_KEY } from '../auth.constants';


/** Class representing an AuthGuard. */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Create an AuthGuard.
   * @param {Router} router - Injected router.
   * @param {StorageService} storageService - Injected storage service.
   */
  constructor(
    private router: Router,
    private storageService: StorageService) {
  }

  /**
   * Check if route can be accessed.
   * @param { ActivatedRouteSnapshot } next
   * @param { RouterStateSnapshot } state
   * @returns {boolean}
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storageService.get(STORAGE_TOKEN_KEY)) {
      return true;
    }
    this.router.navigateByUrl('/auth');
    return false;
  }
}
