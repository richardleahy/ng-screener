import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { CandidateAddEditFormComponent } from './candidate-add-edit-form.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CandidateService } from '../services/candidate.service';
import { ScreenService } from '../../screens/services/screen.service';
import { of, throwError } from 'rxjs';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { Screen } from '../../screens/screen';
import { Candidate } from '../candidate';
import { HttpResult } from '../../../core/services/http-result';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('CandidateAddFormComponent', () => {
  let component: CandidateAddEditFormComponent;
  let fixture: ComponentFixture<CandidateAddEditFormComponent>;
  let candidateServiceSpy: jasmine.SpyObj<CandidateService>;
  let screenServiceSpy: jasmine.SpyObj<ScreenService>;
  let screens: Screen[];
  let candidate: Candidate;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.setParamMap({ id: 1 });
    const candidateSpy = jasmine.createSpyObj(
      'CandidateService', ['getCandidate', 'addCandidate', 'updateCandidate']);
    const screenSpy = jasmine.createSpyObj('ScreenService', ['getScreens']);
    screens = [
      {pk: 1, name: "test", questions: []}
    ];
    candidate = {
      first_name: "test",
      surname: "test",
      email: "test"
    };
    screenSpy.getScreens.and.returnValue(
      of(new HttpResult(true, screens))
    );
    candidateSpy.getCandidate.and.returnValue(
      of(new HttpResult(true, candidate))
    );
    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RouterTestingModule
      ],
      declarations: [ CandidateAddEditFormComponent ],
      providers: [
        { provide: CandidateService, useValue: candidateSpy},
        { provide: ScreenService, useValue: screenSpy},
        { provide: ActivatedRoute, useValue: activatedRoute },
      ]
    })
    .compileComponents();

    screenServiceSpy = TestBed.get(ScreenService);
    candidateServiceSpy = TestBed.get(CandidateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getCandidate should be called if id', () => {
    expect(component.candidate).toBe(candidate);
  });

  it('#getScreens should be called after construction', () => {
    expect(component.screens).toBe(screens);
  });

  it('#getScreens should return screens', () => {
    component.screens = [];
    component.getScreens();
    expect(component.screens).toEqual(screens);

  });

  it('#getCandidate should return candidate', () => {
    component.getCandidate(1);
    expect(component.candidate).toEqual(candidate); 
  });

  it('#addCandidate should add candidate', () => {

    candidateServiceSpy.addCandidate.and.returnValue(
      of(new HttpResult(true))
    );
    component.addCandidate();
    expect(candidateServiceSpy.addCandidate.calls.count()).toBe(1);
 
  });

  it('#addCandidate should return error', () => {
    const errorResponse = new HttpErrorResponse({
      error: ['test 400 error'],
      status: 400, statusText: 'Err'
    });
    candidateServiceSpy.addCandidate.and.returnValue(
      of(new HttpResult(false, errorResponse))
    );
    component.addCandidate();
    expect(component.errors['errors'][0]).toBe(errorResponse['error'][0]);
    
  });

  it('#updateCandidate should update candidate', () => {
    candidateServiceSpy.updateCandidate.and.returnValue(
      of(new HttpResult(true))
    );
    component.updateCandidate();
    expect(candidateServiceSpy.updateCandidate.calls.count()).toBe(1); 
  });

  it('#updateCandidate should return error', () => {
    const errorResponse = new HttpErrorResponse({
      error: ['test 400 error'],
      status: 400, statusText: 'Err'
    });
    candidateServiceSpy.updateCandidate.and.returnValue(
      of(new HttpResult(false, errorResponse))
    );
    component.updateCandidate();
    expect(component.errors['errors'][0]).toBe(errorResponse['error'][0]);  
  });
});
