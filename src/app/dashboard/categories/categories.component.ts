import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { HttpResult } from '../../core/services/http-result';
import { CategoryService } from './services/category.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

/**
 * Class representing a CategoriesComponent.
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  /** Array of categories */
  categories: Category[];
  /** Font Awesome trash icon */
  faTrash = faTrash;
  /** Font Awesome save icon */
  faSave = faSave;
  /** Font Awesome left arrow icon */
  faArrowLeft = faArrowLeft;

  /**
   * Create a CategoriesComponent.
   * @param {CategoryService} categoryService - Injected category service.
   * @param {Location} location - Injected location service.
   */
  constructor(
    private categoryService: CategoryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  /**
   * Navigate to previous page.
   */
  locationBack() {
    this.location.back();
  }

  /**
   * Edit category.
   * @param {Category} category - Category to edit.
   */
  editCategory(category: Category) {
    if (!category) {return;}
    this.categoryService.editCategory(category)
      .subscribe();
  }
  
  /**
   * Add category.
   * @param {string} category - Category name to add.
   */
  addCategory(category: string) {
    category = category.trim();
    if (!category) {return;}
    this.categoryService.addCategory({ category } as Category)
      .subscribe((res: HttpResult) => {
        if (res.isSuccess()) {
          this.categories.push(
            res.getResponse() as Category
          );
        }
      });
  }

  /**
   * Get categories.
   */
  getCategories(): void {
    this.categoryService.getCategories().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.categories = res.getResponse() as Category[];
      }
    });
  }

  /**
   * Delete category.
   * @param {Category} category - Category to delete.
   */
  deleteCategory(category: Category): void {
    this.categories = this.categories.filter(c => c !== category);
    this.categoryService.deleteCategory(category).subscribe();
  }

}
