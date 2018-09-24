import { Component, OnInit } from '@angular/core';
import { Candidate } from '../candidate';
import { CandidateService } from '../services/candidate.service';
import { ScreenService } from '../../screens/services/screen.service';
import { Screen } from '../../screens/screen';
import { Location } from '@angular/common';
import { HttpResult } from '../../../core/services/http-result';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { faSave, faPlus, faDesktop} from '@fortawesome/free-solid-svg-icons';


/** Class representing a CandidateAddEditFormComponent */
@Component({
  selector: 'app-candidate-add-edit-form',
  templateUrl: './candidate-add-edit-form.component.html',
  styleUrls: ['./candidate-add-edit-form.component.scss']
})
export class CandidateAddEditFormComponent implements OnInit {

  /** candidate data */
  candidate: Candidate = <Candidate>{};
  /** form errors */
  errors: any = {};
  /** form submission */
  submitted: boolean = false;
  /** routed id */
  id: number;
  /** Font Awesome left arrow icon */
  faArrowLeft = faArrowLeft;
  /** Font Awesome save icon */
  faSave = faSave;
  /** Font Awesome desktop icon */
  faDesktop = faDesktop;
  /** Font Awesome plus icon */
  faPlus = faPlus;
  /** Array of screens */
  screens: Screen[];

  /**
   * Create a CandidateAddEditFormComponent.
   * @param {ActivatedRoute} route - Injected activated route.
   * @param {CandidateService} candidateService - Injected candidate service
   * @param {ScreenService} screenService - Injected screen service.
   * @param {Location} location - Injected location.
   */
  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private screenService: ScreenService,
    private location: Location
  ) { }

  ngOnInit() {
    // subscribe to get id if routed to.
    this.route.paramMap.subscribe(pmap => {
      if(pmap.get('id')) {
        this.id = +pmap.get('id');
      }
  
      if (this.id) {
        this.getCandidate(this.id);
      }
  
    });

    this.getScreens();
  }

  /**
   * Get all screens.
   */
  getScreens(): void {
    this.screenService.getScreens()
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.screens = res.getResponse();
        }
    });
  }

  /**
   * Get the candidate.
   * @param {number} id - candidate id. 
   */
  getCandidate(id): void {
    this.candidateService.getCandidate(id)
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.candidate = res.getResponse();
        }
    });
  }

  /**
   * Add candidate.
   */
  addCandidate() {
    this.candidateService.addCandidate(this.candidate)
      .subscribe((res: HttpResult) => {
        this.submitted = false;
      
        if (!res.isSuccess()) {
          this.errors = res.getErrors();
        } else {
          // return to previous screen if successful
          this.locationBack();
        }
    });
  }

  /**
   * Update the candidate.
   */
  updateCandidate() {
    this.candidateService.updateCandidate(this.candidate)
      .subscribe((res: HttpResult) => {
        this.submitted = false;

        if (!res.isSuccess()) {
          this.errors = res.getErrors();
        } else {
          // return to previous screen if successful
          this.locationBack();
        }
    });
  }

  /**
   * Return to previous page.
   */
  locationBack() {
    this.location.back();
  }

  /**
   * Submit the form
   */
  onSubmit() {
    this.submitted = true;

    // edit mode
    if (this.id) {
      this.updateCandidate();
    } else {
      // new candidate screen
      this.addCandidate();
    }    

  }

}
