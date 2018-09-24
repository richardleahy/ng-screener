import { Component, OnInit } from '@angular/core';
import { ScreenService } from '../../screens/services/screen.service';
import { HttpResult } from '../../../core/services/http-result';

/**
 * Class representing a HomeScreensComponent.
 */
@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html'
})
export class HomeScreensComponent implements OnInit {

  /** screens count */
  current: number = 0;

  /**
   * Create a HomeScreensComponent.
   * @param {ScreenService} screenService - Injected screen service.
   */
  constructor(
    private screenService: ScreenService
  ) { }

  ngOnInit() {
    this.getScreens();
  }

  /**
   * Get screens count.
   */
  getScreens() {
    this.screenService.getScreens().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.current = res.getResponse().length;
      }
    });
  }

}
