import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsListComponent } from './questions-list.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from '../../../layout/layout.module';
import { QuestionService } from '../services/question.service';
import { FormsModule } from '@angular/forms';
import {  FilterPipe } from '../pipes/filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';
import { Question } from '../question';

describe('QuestionsListComponent', () => {
  let component: QuestionsListComponent;
  let fixture: ComponentFixture<QuestionsListComponent>;
  let questionServiceSpy: jasmine.SpyObj<QuestionService>;
  let questions: Question[];

  beforeEach(async(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const questionSpy = jasmine.createSpyObj('QuestionService', ['getQuestions', 'deleteQuestion']);

    questions = [{
      pk: 1,
      question: "test"
    }];

    questionSpy.getQuestions.and.returnValue(
      of(new HttpResult(true, questions))
    );
    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RouterTestingModule
      ],
      declarations: [ QuestionsListComponent, FilterPipe ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: QuestionService, useValue: questionSpy}
      ]
    })
    .compileComponents();

    questionServiceSpy = TestBed.get(QuestionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getQuestions should return questions', () => {
    expect(component.questions).toBe(questions);
  });

  it('#deleteQuestion should delete question', () => {
    questionServiceSpy.deleteQuestion.and.returnValue(
      of(new HttpResult(true))
    );
    component.deleteQuestion(questions[0]);
    expect(component.questions).toEqual([]);
  });
});
