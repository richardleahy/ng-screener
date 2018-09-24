import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/** Class representing a SpinnerService */
@Injectable()
export class SpinnerService {
  private selector: string = 'global-spinner';
  private el: HTMLElement;

  /**
   * Create a SpinnerService.
   * @param document
   */
  constructor(
    @Inject(DOCUMENT) private document) { 
    this.el = this.document.getElementById(this.selector);
  }

  /**
   * Show the spinner.
   */
  show() {
    this.el.style['display'] = 'block';
  }

  /**
   * Hide the spinner.
   */
  hide() {
    this.el.style['display'] = 'none';
  }
}
