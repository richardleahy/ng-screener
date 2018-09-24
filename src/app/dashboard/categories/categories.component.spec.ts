import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { MiscModule } from '../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../layout/layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryService } from './services/category.service';
import { of } from 'rxjs';
import { HttpResult } from '../../core/services/http-result';
import { Category } from './category';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let categories: Category[];

  beforeEach(async(() => {
    categories = [
      {pk: 1, category: "test"}
    ];
    const categorySpy = jasmine.createSpyObj(
      'CategoryService', ['getCategories', 'addCategory', 'deleteCategory', 'editCategory']);
    categorySpy.getCategories.and.returnValue(
      of(new HttpResult(true, categories))
    );

    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ CategoriesComponent ],
      providers: [
        { provide: CategoryService, useValue: categorySpy}
      ]
    })
    .compileComponents();

    categoryServiceSpy = TestBed.get(CategoryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('#getCategories should return categories', () => {

    expect(component.categories).toEqual(categories);
  });

  xit('#addCategory should add category', () => {

    categoryServiceSpy.addCategory.and.returnValue(
      of(new HttpResult(true, {pk: 2, category: "test"}))
    );
    component.addCategory("test");
    expect(categoryServiceSpy.addCategory.calls.count()).toBe(1);
    expect(component.categories.length).toBe(2);
 
  });

  xit('#editCategory should edit category', () => {

    categoryServiceSpy.editCategory.and.returnValue(
      of(new HttpResult(true))
    );
    component.editCategory({pk: 1, category: "test"});
    expect(categoryServiceSpy.editCategory.calls.count()).toBe(1);
 
  });

  xit('#deleteCategory should delete category', () => {
    categoryServiceSpy.deleteCategory.and.returnValue(
      of(new HttpResult(true))
    );
    component.deleteCategory(categories[0]);
    expect(component.categories).toEqual([]);
  }); 
});
