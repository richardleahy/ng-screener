import { Component, OnInit } from '@angular/core';
import { Candidate } from '../candidate';
import { HttpResult } from '../../../core/services/http-result';
import { CandidateService } from '../services/candidate.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

/** Class representing a CandidatesListComponent */
@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {

  /** array of candidates */
  candidates: Candidate[];
  /** Font Awesome trash icon */
  faTrash = faTrash;
  /** Font Awesome save icon */
  faPlus = faPlus;
  /** Font Awesome left arrow icon */
  faArrowLeft = faArrowLeft;
  filterBox: string;

  /**
   * Create a CandidatesListComponent.
   * @param {CandidateService} candidateService - Injected candidate service.
   * @param {Location} location - Injected location service.
   */
  constructor(
    private candidateService: CandidateService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCandidates();
  }

  /**
   * Navigate to previous page.
   */
  locationBack() {
    this.location.back();
  }

  /**
   * Get all candidates.
   */
  getCandidates(): void {
    this.candidateService.getCandidates().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.candidates = res.getResponse();
      }
    });
  }

  /**
   * Delete candidate.
   */
  deleteCandidate(candidate: Candidate): void {
    this.candidates = this.candidates.filter(c => c !== candidate);
    this.candidateService.deleteCandidate(candidate).subscribe((res: HttpResult) => {
      console.log(res);
    });
  }

}
