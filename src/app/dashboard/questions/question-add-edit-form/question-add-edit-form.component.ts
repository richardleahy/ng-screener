import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QuestionService } from '../services/question.service';
import { Location } from '@angular/common';
import { HttpResult } from '../../../core/services/http-result';
import { CategoryService } from '../../categories/services/category.service';
import { Category } from '../../categories/category';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { faSave, faPlus} from '@fortawesome/free-solid-svg-icons';

/**
 * Class representing a QuestionAddEditFormComponent.
 */
@Component({
  selector: 'app-question-add-edit-form',
  templateUrl: './question-add-edit-form.component.html',
  styleUrls: ['./question-add-edit-form.component.scss']
})
export class QuestionAddEditFormComponent implements OnInit {

  /** Question data */
  question: Question = <Question>{};
  /** Array of categories */
  categories: Category[];
  /** form errors */
  errors: any = {};
  /** form submission */
  submitted: boolean = false;
  /** save add btn visible */
  saveAndAdd: boolean = false;
  /** routed question */
  id: number;
  /** Font Awesome left arrow icon */
  faArrowLeft = faArrowLeft;
  /** Font Awesome save icon */
  faSave = faSave;
  /** Font Awesome plus icon */
  faPlus = faPlus;

  /**
   * Create a QuestionAddEditFormComponent.
   * @param {ActivatedRoute} route - Injected route.
   * @param {QuestionService} questionService - Injected Question service.
   * @param {Location} location - Injected location.
   * @param {CategoryService} categoryService - Injected category service.
   */
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    // get question if routed.
    this.route.paramMap.subscribe(pmap => {
      if(pmap.get('id')) {
        this.id = +pmap.get('id');
      }
  
      if (this.id) {
        this.getQuestion(this.id);
      }
  
    });

    this.getCategories();
  }

  /**
   * Compare objects for multiselect.
   */
  compareFn(c1: Category, c2: Category ): boolean {
    return c1 && c2 ? c1.pk === c2.pk: c1 === c2
  }

  /**
   * Get all categories.
   */
  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.categories = res.getResponse();
        }
    });
  }

  /**
   * Get question
   * @param id 
   */
  getQuestion(id): void {
    this.questionService.getQuestion(id)
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.question = res.getResponse();
        }
    });
  }

  /**
   * Add question.
   * Return to previous page if successful, otherwise
   * sets errors.
   */
  addQuestion() {
    this.questionService.addQuestion(this.question)
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
   * Update question.
   * Return to previous page if successful, otherwise
   * sets errors.
   */
  updateQuestion() {
    this.questionService.updateQuestion(this.question)
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
    // save and add another
    if (!this.saveAndAdd) {
      this.location.back();
    }
    this.saveAndAdd = false;
  }

  /**
   * Submit the form.
   */
  onSubmit() {
    this.submitted = true;

    // edit mode.
    if (this.id) {
      this.updateQuestion();
    } else {
      // new question.
      this.addQuestion();
    }    

  }

}
