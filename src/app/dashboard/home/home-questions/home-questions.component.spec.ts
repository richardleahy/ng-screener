import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeQuestionsComponent } from './home-questions.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../questions/services/question.service';
import { of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';

describe('HomeQuestionsComponent', () => {
  let component: HomeQuestionsComponent;
  let fixture: ComponentFixture<HomeQuestionsComponent>;
  let questionServiceSpy: jasmine.SpyObj<QuestionService>;

  beforeEach(async(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const questionSpy = jasmine.createSpyObj('QuestionService', ['getQuestions']);
    const questions = [
      {pk: 1, question: "test"}
    ];
    questionSpy.getQuestions.and.returnValue(
      of(new HttpResult(
        true,
        questions
      ))
    );
    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RoundProgressModule
      ],
      declarations: [ HomeQuestionsComponent ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: QuestionService, useValue: questionSpy},
      ]
    })
    .compileComponents();

    questionServiceSpy = TestBed.get(QuestionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getQuestions should return questions', () => {
    expect(questionServiceSpy.getQuestions.calls.count()).toBe(1);
    expect(component.current).toBe(1);
 
  });
});
