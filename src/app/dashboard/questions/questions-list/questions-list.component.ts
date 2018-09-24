import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { HttpResult } from '../../../core/services/http-result';
import { QuestionService } from '../services/question.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

/**
 * Class representing a QuestionsListComponent.
 */
@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  /** Array of questions. */
  questions: Question[];
  /** Font Awesome trash icon */
  faTrash = faTrash;
  /** Font Awesome plus icon */
  faPlus = faPlus;
  /** Font Awesome left arrow icon */
  faArrowLeft = faArrowLeft;

  /**
   * Create a QuestionsListComponent
   * @param questionService 
   * @param location 
   */
  constructor(
    private questionService: QuestionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getQuestions();
  }

  /**
   * Navigate to previous page.
   */
  locationBack() {
    this.location.back();
  }

  /**
   * Get all questions.
   */
  getQuestions(): void {
    this.questionService.getQuestions().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.questions = res.getResponse() as Question[];
      }
    });
  }

  /**
   * Delete question.
   * @param {Question} question - Question to delete.
   */
  deleteQuestion(question: Question): void {
    this.questions = this.questions.filter(q => q !== question);
    this.questionService.deleteQuestion(question).subscribe((res: HttpResult) => {
      console.log(res);
    });
  }

}
