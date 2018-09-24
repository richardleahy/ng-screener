import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

/**
 * Class representing a SpinnerComponent.
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  /** Font Awesome spinner icon. */
  faSpinner = faSpinner;
  
  constructor() { }

  ngOnInit() {
  }

}
