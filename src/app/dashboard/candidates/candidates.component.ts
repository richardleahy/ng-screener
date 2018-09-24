import { Component, OnInit } from '@angular/core';

/**
 * Class representing a CandidatesComponent.
 * Parent component to load child routes.
 */
@Component({
  selector: 'app-candidates',
  template: `<router-outlet></router-outlet>`
})
export class CandidatesComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
