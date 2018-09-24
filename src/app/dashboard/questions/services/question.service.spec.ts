import { TestBed, inject } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';

describe('QuestionService', () => {
  let questionService: QuestionService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        QuestionService,
        { provide: HttpClient, useValue: httpSpy}
      ]
    });

    questionService = TestBed.get(QuestionService);
    httpClientSpy = TestBed.get(HttpClient);
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));

  it('#getQuestion should return stubbed question', () => {
    const stubValue = {pk: 1, question: "test"};
    httpClientSpy.get.and.returnValue(
      of(stubValue)
    );
    questionService.getQuestion(1).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
      expect(res.getResponse()).toEqual(stubValue);
    });
  });

  it('#updateQuestion should update question', () => {
    const stubValue = {pk: 1, question: "test"};
    httpClientSpy.put.and.returnValue(
      of({})
    );
    questionService.updateQuestion(stubValue).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
  });

  it('#addQuestion should add question', () => {
    const stubValue = {pk: 1, question: "test"};
    httpClientSpy.post.and.returnValue(
      of({})
    );
    questionService.addQuestion(stubValue).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
  });

  it('#getQuestions should return stubbed questions', () => {
    const stubValue = [
      {pk: 1, question: "test"},
      {pk: 2, question: "test2"}
    ];
    httpClientSpy.get.and.returnValue(
      of(stubValue)
    );
    questionService.getQuestions().subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
      expect(res.getResponse()).toEqual(stubValue);
    });
  });
});
