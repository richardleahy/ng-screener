import { TestBed, inject } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post']);
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: HttpClient, useValue: httpSpy}
      ]
    });
    categoryService = TestBed.get(CategoryService);
    httpClientSpy = TestBed.get(HttpClient);
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));

  it('#updateCategory should update stubbed category', () => {
    const stubValue = {pk: 1, category: "test"};
    httpClientSpy.put.and.returnValue(
      of({})
    );
    categoryService.editCategory(stubValue).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
  });

  it('#addCategory should add stubbed category', () => {
    const stubValue = {pk: 1, category: "test"};
    httpClientSpy.post.and.returnValue(
      of({})
    );
    categoryService.addCategory(stubValue).subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
    });
  });

  it('#getCategories should return stubbed categories', () => {
    const stubValue = [
      {pk: 1, category: "test"},
      {pk: 2, category: "test2"}
    ];
    httpClientSpy.get.and.returnValue(
      of(stubValue)
    );
    categoryService.getCategories().subscribe((res: HttpResult) => {
      expect(res.isSuccess()).toBe(true);
      expect(res.getResponse()).toEqual(stubValue);
    });
  });
});
