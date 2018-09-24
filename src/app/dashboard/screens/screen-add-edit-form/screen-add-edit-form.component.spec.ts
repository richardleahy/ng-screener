import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenAddEditFormComponent } from './screen-add-edit-form.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ScreenService } from '../services/screen.service';
import { of } from 'rxjs';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FilterPipe } from '../pipes/filter.pipe';
import { QuestionService } from '../../questions/services/question.service';
import { Screen } from '../screen';
import { HttpResult } from '../../../core/services/http-result';
import { Question } from '../../questions/question';

describe('ScreenAddFormComponent', () => {
  let component: ScreenAddEditFormComponent;
  let fixture: ComponentFixture<ScreenAddEditFormComponent>;
  let screenServiceSpy: jasmine.SpyObj<ScreenService>;
  let questionServiceSpy: jasmine.SpyObj<QuestionService>;
  let screen: Screen;
  let activatedRoute: ActivatedRouteStub;
  let questions: Question[];

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({ id: 1 });

    const questionSpy = jasmine.createSpyObj('QuestionService', ['getQuestions']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const screenSpy = jasmine.createSpyObj('ScreenService', ['getScreen', 'addScreen', 'updateScreen']);

    questions = [
      {pk: 1, question: "test"}
    ];

    questionSpy.getQuestions.and.returnValue(
      of(new HttpResult(true, questions))
    );

    screen = {pk: 1, name: "test", questions: []};
    screenSpy.getScreen.and.returnValue(
      of(new HttpResult(true, screen))
    );

    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule
      ],
      declarations: [ ScreenAddEditFormComponent, FilterPipe ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: Location, useValue: locationSpy},
        { provide: ScreenService, useValue: screenSpy},
        { provide: ActivatedRoute, useValue: activatedRoute},
        { provide: QuestionService, useValue: questionSpy},
      ],
    })
    .compileComponents();

    screenServiceSpy = TestBed.get(ScreenService);
    questionServiceSpy = TestBed.get(QuestionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getScreen should be called if id', () => {
    expect(component.screen).toBe(screen);
  });

  it('#getQuestions should be called after construction', () => {
    expect(component.questions).toBe(questions);
  });

  it('#addScreen should add screen', () => {

    screenServiceSpy.addScreen.and.returnValue(
      of(new HttpResult(true))
    );
    component.addScreen();
    expect(screenServiceSpy.addScreen.calls.count()).toBe(1);
 
  });

  it('#addScreen should return error', () => {
    const errorResponse = new HttpErrorResponse({
      error: ['test 400 error'],
      status: 400, statusText: 'Err'
    });
    screenServiceSpy.addScreen.and.returnValue(
      of(new HttpResult(false, errorResponse))
    );
    component.addScreen();
    expect(component.errors['errors'][0]).toBe(errorResponse['error'][0]);
    
  });


  it('#updateScreen should update screen', () => {

    screenServiceSpy.updateScreen.and.returnValue(
      of(new HttpResult(true))
    );
    component.updateScreen();
    expect(screenServiceSpy.updateScreen.calls.count()).toBe(1);
 
  });

  it('#updateScreen should return error', () => {
    const errorResponse = new HttpErrorResponse({
      error: ['test 400 error'],
      status: 400, statusText: 'Err'
    });
    screenServiceSpy.updateScreen.and.returnValue(
      of(new HttpResult(false, errorResponse))
    );
    component.updateScreen();
    expect(component.errors['errors'][0]).toBe(errorResponse['error'][0]);
    
  });
});
