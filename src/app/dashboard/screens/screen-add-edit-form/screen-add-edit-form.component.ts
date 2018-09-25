import { Component, OnInit } from '@angular/core';
import { Screen } from '../screen';
import { ScreenService } from '../services/screen.service';
import { Location } from '@angular/common';
import { HttpResult } from '../../../core/services/http-result';
import { QuestionService } from '../../questions/services/question.service';
import { Question } from '../../questions/question';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { faSave, faPlus} from '@fortawesome/free-solid-svg-icons';

/**
 * Class representing a ScreenAddEditFormComponent.
 */
@Component({
  selector: 'app-screen-add-edit-form',
  templateUrl: './screen-add-edit-form.component.html',
  styleUrls: ['./screen-add-edit-form.component.scss']
})
export class ScreenAddEditFormComponent implements OnInit {

  /** screen data */
  screen: Screen = <Screen>{};
  /** array of questions */
  questions: Question[];
  /** selected questions */
  selectedQuestions: Question[] = [];
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
  /** Font Awesome plus icon */
  faPlus = faPlus;
  filterBox: string;

  /**
   * Create a ScreenAddEditFormComponent
   * @param {ActivatedRoute} route - Injected activated route.
   * @param {ScreenService} screenService - Injected screen service.
   * @param {Location} location - Injected location.
   * @param {QuestionService} questionService - Injected question service.
   */
  constructor(
    private route: ActivatedRoute,
    private screenService: ScreenService,
    private location: Location,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    // get screen in edit mode.
    this.route.paramMap.subscribe(pmap => {
      if(pmap.get('id')) {
        this.id = +pmap.get('id');
      }
      
      if (this.id) {
        this.getScreen(this.id);
      }
    });

    this.getQuestions();
  }

  /**
   * Check which questions are selected.
   * @param question 
   */
  checkSelected(question: Question) {
    return this.selectedQuestions.findIndex(
      q => q.pk === question.pk) > -1;
  }

  /**
   * Add / remove selected question.
   * @param {Question} question 
   */
  toggleQuestions(question: Question) {
    let idx = this.selectedQuestions.findIndex(q => q.pk === question.pk);
    if (idx !== -1) {
      this.selectedQuestions.splice(idx, 1);
    } else {
      this.selectedQuestions.push(
        {
          question: question.question,
          pk: question.pk
        }
      );
    }
  }

  /**
   * Get questions.
   */
  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.questions = res.getResponse();
        }
    });
  }

  /**
   * Get screen
   * @param {number} id - Screen id.
   */
  getScreen(id): void {
    this.screenService.getScreen(id)
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.screen = res.getResponse();
          for (let q of this.screen.questions) {
            this.selectedQuestions.push(
              {question:q.question,
               pk: q.pk} as Question
            );
          }
        }
    });
  }

  /**
   * Add screen
   */
  addScreen() {
    this.screenService.addScreen(this.screen)
      .subscribe((res: HttpResult) => {
        this.submitted = false;
      
        if (!res.isSuccess()) {
          this.errors = res.getErrors();
        } else {
          this.locationBack();
        }
    });
  }

  /**
   * Update screen
   */
  updateScreen() {
    this.screenService.updateScreen(this.screen)
      .subscribe((res: HttpResult) => {
        this.submitted = false;

        if (!res.isSuccess()) {
          this.errors = res.getErrors();
        } else {
          this.locationBack();
        }
    });
  }

  /**
   * Navigate to previous page.
   */
  locationBack() {
    this.location.back();
  }

  /**
   * Submit form.
   */
  onSubmit() {
    this.submitted = true;

    this.screen = {
      pk: this.screen.pk,
      name: this.screen.name,
      questions: this.selectedQuestions
    };

    // edit mode
    if (this.id) {
      this.updateScreen();
    } else {
      // new screen
      this.addScreen();
    }    

  }

}
