import { TestBed, inject } from '@angular/core/testing';

import { ScreenService } from './screen.service';
import { HttpClient } from '@angular/common/http';
import { HttpResult } from '../../../core/services/http-result';
import { of } from 'rxjs';

describe('ScreenService', () => {
  let screenService: ScreenService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post']);
    TestBed.configureTestingModule({
      providers: [
        ScreenService,
        { provide: HttpClient, useValue: httpSpy}
      ]
    });

    screenService = TestBed.get(ScreenService);
    httpClientSpy = TestBed.get(HttpClient);
  });

  it('should be created', inject([ScreenService], (service: ScreenService) => {
    expect(service).toBeTruthy();
  }));

  it('#getScreen should return stubbed screen', () => {
    const stubValue = {pk: 1, name: "test"};
    httpClientSpy.get.and.returnValue(
      of(stubValue)
    );
    screenService.getScreen(1).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
      expect(res.getResponse()).toEqual(stubValue);
    });
  });

  it('#updateScreen should update stubbed screen', () => {
    const stubValue = {pk: 1, name: "test", questions: []};
    httpClientSpy.put.and.returnValue(
      of(stubValue)
    );
    screenService.updateScreen(stubValue).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
  });

  it('#addScreen should add screen', () => {
    const stubValue = {pk: 1, name: "test", questions: []};
    httpClientSpy.post.and.returnValue(
      of(stubValue)
    );
    screenService.addScreen(stubValue).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
  });

  it('#getScreens should return stubbed screens', () => {
    const stubValue = [
      {pk: 1, name: "test"},
      {pk: 2, name: "test2"}
    ];
    httpClientSpy.get.and.returnValue(
      of(stubValue)
    );
    screenService.getScreens().subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
      expect(res.getResponse()).toEqual(stubValue);
    });
  });
});
