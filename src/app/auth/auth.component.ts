import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SpinnerService } from '../core/services/spinner.service'

/**
 * Class representing an AuthComponent.
 */
@Component({
  selector: 'app-auth',
  template: '<router-outlet></router-outlet>'
})
export class AuthComponent implements OnInit, AfterViewInit {

  /**
   * Create an AuthComponent
   * @param {SpinnerService} spinnerService - Injected spinner service.
   */
  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit () {
    this.spinnerService.hide();
  }

}
