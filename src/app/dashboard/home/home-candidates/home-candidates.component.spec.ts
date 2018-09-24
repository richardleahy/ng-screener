import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCandidatesComponent } from './home-candidates.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from '../../candidates/services/candidate.service';
import { of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';

describe('HomeCandidatesComponent', () => {
  let component: HomeCandidatesComponent;
  let fixture: ComponentFixture<HomeCandidatesComponent>;
  let candidateServiceSpy: jasmine.SpyObj<CandidateService>;

  beforeEach(async(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const candidateSpy = jasmine.createSpyObj('CandidateService', ['getCandidates']);
    const candidates = [
      {pk: 1, first_name: "test", surame: "test"}
    ];
    candidateSpy.getCandidates.and.returnValue(
      of(new HttpResult(true, candidates))
    );

    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RoundProgressModule
      ],
      declarations: [ HomeCandidatesComponent ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: CandidateService, useValue: candidateSpy},
      ]
    })
    .compileComponents();

    candidateServiceSpy = TestBed.get(CandidateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getCandidates should return candidates', () => {
    expect(candidateServiceSpy.getCandidates.calls.count()).toBe(1);
    expect(component.current).toBe(1);
 
  });
});
