import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../questions/services/question.service';
import { HttpResult } from '../../../core/services/http-result';

/**
 * Class representing a HomeQuestionsComponent.
 */
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class HomeQuestionsComponent implements OnInit {

  /** questions count */
  current: number = 0;

  /**
   * Create a HomeQuestionsComponent.
   * @param {QuestionService} questionService - Injected question service.
   */
  constructor(
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  /**
   * Get questions count.
   */
  getQuestions() {
    this.questionService.getQuestions().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.current = res.getResponse().length;
      }
    });
  }

}
