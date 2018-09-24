import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateScreenComponent } from './candidate-screen.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CandidateService } from '../services/candidate.service';
import { ScreenService } from '../../screens/services/screen.service';
import { AnswerService } from '../services/answer.service';
import { of } from 'rxjs';
import { Candidate } from '../candidate';
import { HttpResult } from '../../../core/services/http-result';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { ActivatedRoute } from '@angular/router';
import { Screen } from '../../screens/screen';

describe('CandidateScreenComponent', () => {
  let component: CandidateScreenComponent;
  let fixture: ComponentFixture<CandidateScreenComponent>;
  let candidateServiceSpy: jasmine.SpyObj<CandidateService>;
  let screenServiceSpy: jasmine.SpyObj<ScreenService>;
  let answerServiceSpy: jasmine.SpyObj<AnswerService>;
  let screen: Screen;
  let candidate: Candidate;
  let activatedRoute: ActivatedRouteStub;
  let score = {score: 90};
  let currentAnswer = [{answer_correct: 1}];

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({ id: 1 });
    candidate = {
      pk: 1,
      first_name: "test",
      surname: "test",
      email: "test",
      screen_pk: 1
    };
    screen = {pk: 1, name: "test", questions: [{ pk: 1, question: "test"}]};

    const candidateSpy = jasmine.createSpyObj('CandidateService', ['getCandidate']);
    const screenSpy = jasmine.createSpyObj('ScreenService', ['getScreen', 'getScore']);
    const answerSpy = jasmine.createSpyObj('AnswerService', ['getCurrentAnswer', 'addAnswer', 'updateAnswer']);
    candidateSpy.getCandidate.and.returnValue(
      of(new HttpResult(true, candidate))
    );
    screenSpy.getScreen.and.returnValue(
      of(new HttpResult(true, screen))
    );
    screenSpy.getScore.and.returnValue(
      of(new HttpResult(true, score))
    );
    answerSpy.getCurrentAnswer.and.returnValue(
      of(new HttpResult(true, currentAnswer))
    );
    
    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RouterTestingModule
      ],
      declarations: [ CandidateScreenComponent ],
      providers: [
        { provide: CandidateService, useValue: candidateSpy},
        { provide: ScreenService, useValue: screenSpy},
        { provide: AnswerService, useValue: answerSpy},
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();

    screenServiceSpy = TestBed.get(ScreenService);
    candidateServiceSpy = TestBed.get(CandidateService);
    answerServiceSpy = TestBed.get(AnswerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getCandidate should be called', () => {
    expect(component.candidate).toBe(candidate);
  });

  it('#getScreen should be called', () => {
    expect(component.screen).toBe(screen);
  });

  it('#getScore should be called', () => {
    expect(component.score).toBe(score);
  });

  it('#getAnswer should be called', () => {
    answerServiceSpy.getCurrentAnswer.and.returnValue(
      of(new HttpResult(true, currentAnswer))
    );
    component.getCurrentAnswer();
    expect(component.currentAnswer).toBe(currentAnswer[0]);
  });

  it('#addAnswer #checkDone should be called', () => {
    const spy = spyOn(component, 'checkDone');
    answerServiceSpy.addAnswer.and.returnValue(
      of(new HttpResult(true))
    );
    component.addAnswer({});
    expect(spy).toHaveBeenCalled();
  });

  it('#updateAnswer #checkDone should be called', () => {
    const spy = spyOn(component, 'checkDone');
    answerServiceSpy.updateAnswer.and.returnValue(
      of(new HttpResult(true))
    );
    component.updateAnswer({});
    expect(spy).toHaveBeenCalled();
  });
});
