import { Component, OnInit, Input } from '@angular/core';
import { Error } from './error';

/**
 * Class representing an ErrorComponent.
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  /** array of errors */
  @Input() errors: Error;
  /** error card title */
  @Input() title: number | string;

  constructor() { }

  ngOnInit() {
  }

}
