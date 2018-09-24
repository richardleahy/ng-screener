import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { AnswerService } from '../services/answer.service';
import { ScreenService } from '../../screens/services/screen.service';
import { Question } from '../../questions/question';
import { Screen} from '../../screens/screen';
import { ActivatedRoute } from '@angular/router';
import { HttpResult } from '../../../core/services/http-result';
import { Candidate } from '../candidate';
import { faSave, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

/** Class representing a CandidateScreenComponent */
@Component({
  selector: 'app-candidate-screen',
  templateUrl: './candidate-screen.component.html',
  styleUrls: ['./candidate-screen.component.scss']
})
export class CandidateScreenComponent implements OnInit {

  /** candidate in question */
  candidate: Candidate = <Candidate>{};
  /** screen in question */
  screen: Screen;
  /** Font Awesome left arrow icon */
  faArrowLeft = faArrowLeft;
  /** Font Awesome save icon */
  faSave = faSave;
  /** Font Awesome right arrow icon */
  faArrowRight = faArrowRight;
  /** form errors */
  errors: any = {};
  /** score track */
  score: any = {};
  /** question idx */
  idx: number = 0;
  /** current question under test */
  currentQuestion: Question;
  /** track current questions answer */
  currentAnswer: any = {};
  /** form submission */
  submitted: boolean = false;

  /**
   * Create a CandidateScreenComponent.
   * @param {CandidateService} candidateService - Injected candidate service.
   * @param {AnswerService} answerService - Injected answer service.
   * @param {ScreenService} screenService - Injected screen service.
   * @param {ActivatedRoute} route - Injected activate route.
   * @param {Location} location - Injected location.
   */
  constructor(
    private candidateService: CandidateService,
    private answerService: AnswerService,
    private screenService: ScreenService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    // get candidate if edit mode.
    this.route.paramMap.subscribe(pmap => {
      const id = +pmap.get('id');
      this.getCandidate(id);
    });    
  }

  /**
   * Get screen under test.
   * @param {number} id the screen id. 
   */
  getScreen(id): void {
    this.screenService.getScreen(id)
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.screen = res.getResponse();
          this.refreshData();
        }
    });
  }

  /**
   * Get current question under test.
   */
  getCurrentQuestion() {
    this.currentQuestion = this.screen.questions[this.idx];
  }

  /**
   * Get current answer when in edit mode.
   */
  getCurrentAnswer(): void {
    this.currentAnswer = {};
    this.answerService.getCurrentAnswer(
      this.currentQuestion.pk, this.candidate.pk)
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          if(res.getResponse().length) {
            this.currentAnswer = res.getResponse()[0];
          }
        }
    });
  }

  /**
   * Get and track the candidate score.
   */
  getScore(): void {
    this.screenService.getScore(this.candidate.pk, this.screen.pk)
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.score = res.getResponse();
        }
    });
  }

  /**
   * Get candidate under test.
   * @param {number} id the candidate id.
   */
  getCandidate(id): void {
    this.candidateService.getCandidate(id)
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.candidate = res.getResponse();
          this.getScreen(this.candidate.screen_pk);
        }
    });
  }

  /**
   * Save candidate answer to current question.
   * @param answer
   */
  addAnswer(answer: any): void {
    this.answerService.addAnswer(answer)
      .subscribe((res: HttpResult) => {
        this.submitted = false;
        if (res.isSuccess()) {
          this.checkDone();
        }
    });
  }

    /**
   * Update candidate answer to current question.
   * @param answer
   */
  updateAnswer(answer: any): void {
    this.answerService.updateAnswer(answer, this.currentAnswer.pk)
      .subscribe((res: HttpResult) => {
        this.submitted = false;
        if (res.isSuccess()) {
          this.checkDone();
        }
    });
  }

  /**
   * Check if all questions have been answered.
   * Return to previous page if done, otherwise
   * get the next question.
   */
  checkDone() {
    if (this.idx === this.screen.questions.length-1) {
      this.locationBack();
    } else{
      this.idx += 1; 
      this.refreshData();
    }
  }

  /**
   * Refresh the page, stats, answer etc.
   * Called after each answer save.
   */
  refreshData() {
    this.getScore();
    this.getCurrentQuestion();
    this.getCurrentAnswer();
  }

  /**
   * Navigate to previous page.
   */
  locationBack() {
    this.location.back();
  }

  /**
   * Get previous question.
   */
  prevQuestion() {
    this.idx -= 1;
    this.refreshData();
  }

  /**
   * save the form data.
   */
  onSubmit() {
    this.submitted = true;

    let answer = {
      "question": this.currentQuestion.pk,
      "answer_correct": this.currentAnswer.answer_correct,
      "answer_quality": 1,
      "candidate": this.candidate.pk
    };

    // edit mode
    if (this.currentAnswer.pk) {
      this.updateAnswer(answer);
    } else{
      // new screen
      this.addAnswer(answer);
    }
  
  }

}
