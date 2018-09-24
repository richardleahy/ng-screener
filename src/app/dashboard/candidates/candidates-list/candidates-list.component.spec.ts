import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesListComponent } from './candidates-list.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { CandidateService } from '../services/candidate.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Candidate } from '../candidate';
import { HttpResult } from '../../../core/services/http-result';

describe('CandidatesListComponent', () => {
  let component: CandidatesListComponent;
  let fixture: ComponentFixture<CandidatesListComponent>;
  let candidateServiceSpy: jasmine.SpyObj<CandidateService>;
  let candidates: Candidate[];

  beforeEach(async(() => {
    candidates = [{
      first_name: "test",
      surname: "test",
      email: "test"
    }];
    const candidateSpy = jasmine.createSpyObj(
      'CandidateService', ['getCandidates', 'deleteCandidate']);
    candidateSpy.getCandidates.and.returnValue(
      of(new HttpResult(true, candidates))
    );

    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RouterTestingModule
      ],
      declarations: [ CandidatesListComponent, FilterPipe],
      providers: [
        { provide: CandidateService, useValue: candidateSpy},
      ]
    })
    .compileComponents();

    candidateServiceSpy = TestBed.get(CandidateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getCandidates should return candidates', () => {
    expect(component.candidates).toBe(candidates);
  });

  it('#deleteCandidate should delete candidate', () => {
    candidateServiceSpy.deleteCandidate.and.returnValue(
      of(new HttpResult(true))
    );
    component.deleteCandidate(candidates[0]);
    expect(component.candidates).toEqual([]);
  });
});
