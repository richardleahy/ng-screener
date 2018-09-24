import { Component } from '@angular/core';
import {
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router
} from '@angular/router';
import { SpinnerService } from './core/services/spinner.service';

/**
 * Class representing a AppComponent
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'ng-screener';

  /**
   * Create a AppComponent
   * @param {Router} router 
   * @param {SpinnerService} spinnerService 
   */
  constructor(
    private router: Router,
    private spinnerService: SpinnerService) {
      this.router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            //this.spinnerService.show();
            break;
          }
          case event instanceof NavigationCancel:
          case event instanceof NavigationEnd:
          case event instanceof NavigationError: {
            //this.spinnerService.hide();
            break;
          }
        }
      });
    }
}
