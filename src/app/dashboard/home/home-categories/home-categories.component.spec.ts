import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoriesComponent } from './home-categories.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../categories/services/category.service';
import { of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';

describe('HomeCategoriesComponent', () => {
  let component: HomeCategoriesComponent;
  let fixture: ComponentFixture<HomeCategoriesComponent>;
  let categorySpy: jasmine.SpyObj<CategoryService>;

  beforeEach(async(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);

    const categories = [
      {pk: 1, category: "test"}
    ];
    categoryServiceSpy.getCategories.and.returnValue(
      of(new HttpResult(true, categories))
    );

    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RoundProgressModule
      ],
      declarations: [ HomeCategoriesComponent ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: CategoryService, useValue: categoryServiceSpy},
      ]
    })
    .compileComponents();

    categorySpy = TestBed.get(CategoryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getCategories should return categories', () => {
    expect(categorySpy.getCategories.calls.count()).toBe(1);
    expect(component.current).toBe(1);
 
  });
});
