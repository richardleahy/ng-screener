import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../candidates/services/candidate.service';
import { HttpResult } from '../../../core/services/http-result';

/**
 * Class representing a HomeCandidatesComponent.
 */
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html'
})
export class HomeCandidatesComponent implements OnInit {

  /** candidate count */
  current: number = 0;

  /**
   * Create a HomeCandidatesComponent.
   * @param {CandidateService} candidateService - Injected candidate service.
   */
  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.getCandidates();
  }

  /**
   * Get candidate count.
   */
  getCandidates() {
    this.candidateService.getCandidates().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.current = res.getResponse().length;
      }
    });
  }

}
