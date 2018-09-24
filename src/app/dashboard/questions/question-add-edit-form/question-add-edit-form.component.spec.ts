import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAddEditFormComponent } from './question-add-edit-form.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../services/question.service';
import { of } from 'rxjs';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../categories/services/category.service';
import { HttpResult } from '../../../core/services/http-result';
import { Category } from '../../categories/category';
import { Question } from '../question';

describe('QuestionAddFormComponent', () => {
  let component: QuestionAddEditFormComponent;
  let fixture: ComponentFixture<QuestionAddEditFormComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let questionServiceSpy: jasmine.SpyObj<QuestionService>;
  let categories: Category[];
  let question: Question;

  beforeEach(async(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const questionSpy = jasmine.createSpyObj(
      'QuestionService', ['getQuestion', 'addQuestion', 'updateQuestion']);
    const categorySpy = jasmine.createSpyObj('CategoryService', ['getCategories']);

    categories = [
      {pk: 1, category: "cat1"}
    ];
    categorySpy.getCategories.and.returnValue(
      of(new HttpResult(true, categories))
    );

    question = {
      pk: 1,
      question: "test"
    };
    questionSpy.getQuestion.and.returnValue(
      of(new HttpResult(true, question))
    );
    const activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({ id: 1 });
    
    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule
      ],
      declarations: [ QuestionAddEditFormComponent ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: Location, useValue: locationSpy},
        { provide: QuestionService, useValue: questionSpy},
        { provide: ActivatedRoute, useValue: activatedRoute},
        { provide: CategoryService, useValue: categorySpy}
      ],
    })
    .compileComponents();

    questionServiceSpy = TestBed.get(QuestionService);
    categoryServiceSpy = TestBed.get(CategoryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getQuestion should be called if id', () => {
    expect(component.question).toBe(question);
  });

  it('#getCategories should be called after construction', () => {
    expect(component.categories).toBe(categories);
  });

  it('#addQuestion should add question', () => {

    questionServiceSpy.addQuestion.and.returnValue(
      of(new HttpResult(true))
    );
    component.addQuestion();
    expect(questionServiceSpy.addQuestion.calls.count()).toBe(1);
 
  });

  it('#updateQuestion should update question', () => {

    questionServiceSpy.updateQuestion.and.returnValue(
      of(new HttpResult(true))
    );
    component.updateQuestion();
    expect(questionServiceSpy.updateQuestion.calls.count()).toBe(1);
 
  });
});
