import { Component, OnInit } from '@angular/core';
import { Screen } from '../screen';
import { HttpResult } from '../../../core/services/http-result';
import { ScreenService } from '../services/screen.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

/**
 * Class representing a ScreensListComponent.
 */
@Component({
  selector: 'app-screens-list',
  templateUrl: './screens-list.component.html',
  styleUrls: ['./screens-list.component.scss']
})
export class ScreensListComponent implements OnInit {

  /** array of screens */
  screens: Screen[];
  /** Font Awesome trash icon */
  faTrash = faTrash;
  /** Font awesome plus icon */
  faPlus = faPlus;
  /** Font Awesome left arrow icon */
  faArrowLeft = faArrowLeft;

  /**
   * Create a ScreensListComponent.
   * @param {ScreenService} screenService - Injected screen service.
   * @param {Location} location - Injected location.
   */
  constructor(
    private screenService: ScreenService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getScreens();
  }

  /**
   * Navigate to previous page.
   */
  locationBack() {
    this.location.back();
  }

  /**
   * Get screens.
   */
  getScreens(): void {
    this.screenService.getScreens().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.screens = res.getResponse();
      }
    });
  }

  /**
   * Delete screen
   * @param {Screen} screen - Screen to delete.
   */
  deleteScreen(screen: Screen): void {
    this.screens = this.screens.filter(s => s !== screen);
    this.screenService.deleteScreen(screen).subscribe((res: HttpResult) => {
      console.log(res);
    });
  }

}
