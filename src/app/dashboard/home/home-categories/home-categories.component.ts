import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../categories/services/category.service';
import { HttpResult } from '../../../core/services/http-result';

/**
 * Class representing a HomeCategoriesComponent.
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class HomeCategoriesComponent implements OnInit {

  current: number = 0;

  /**
   * Create a HomeCategoriesComponent.
   * @param {CategoryService} categoryService - Injected category service.
   */
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  /**
   * Get categories count.
   */
  getCategories() {
    this.categoryService.getCategories().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.current = res.getResponse().length;
      }
    });
  }

}
