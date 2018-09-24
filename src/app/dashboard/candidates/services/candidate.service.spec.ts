import { TestBed, inject } from '@angular/core/testing';

import { CandidateService } from './candidate.service';
import { HttpClient } from '@angular/common/http';
import { HttpResult } from '../../../core/services/http-result';
import { of } from 'rxjs';

describe('CandidateService', () => {
  let candidateService: CandidateService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post']);
    TestBed.configureTestingModule({
      providers: [
        CandidateService,
        { provide: HttpClient, useValue: httpSpy}
      ]
    });

    candidateService = TestBed.get(CandidateService);
    httpClientSpy = TestBed.get(HttpClient);

  });

  it('should be created', inject([CandidateService], (service: CandidateService) => {
    expect(service).toBeTruthy();
  }));

  it('#getCandidate should return stubbed candidate', () => {
    const stubValue = {pk: 1, first_name: "test"};
    httpClientSpy.get.and.returnValue(
      of(stubValue)
    );
    candidateService.getCandidate(1).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
      expect(res.getResponse()).toEqual(stubValue);
    });
  });

  it('#updateCandidate should update stubbed candidate', () => {
    const stubValue = {pk: 1, first_name: "test", surname: "test", email: "tes"};
    httpClientSpy.put.and.returnValue(
      of(stubValue)
    );
    candidateService.updateCandidate(stubValue).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
  });

  it('#addCandidate should add candidate', () => {
    const stubValue = {pk: 1, first_name: "test", surname: "test", email: "tes"};
    httpClientSpy.post.and.returnValue(
      of(stubValue)
    );
    candidateService.addCandidate(stubValue).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
  });

  it('#getCandidates should return stubbed candidates', () => {
    const stubValue = [
      {pk: 1, first_name: "test"},
      {pk: 2, first_name: "test2"}
    ];
    httpClientSpy.get.and.returnValue(
      of(stubValue)
    );
    candidateService.getCandidates().subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
      expect(res.getResponse()).toEqual(stubValue);
    });
  });
});
