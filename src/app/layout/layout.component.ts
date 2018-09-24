import { 
  Component, 
  OnInit, 
  AfterViewInit, 
  Renderer2,
  HostListener, 
  Inject 
} from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { SpinnerService } from '../core/services/spinner.service';
import { DOCUMENT } from '@angular/common';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from './menu-item';
import { Input } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { HttpResult } from '../core/services/http-result';

/**
 * Class representing a LayoutHeaderComponent.
 */
@Component({
  selector: 'app-layout-header',
  template: `
    <nav class="navbar navbar-dark fixed-top">
      <button class="navbar-toggler" type="button" (click)="toggleNav()">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a routerLink="/" class="navbar-brand">
        <span>ng-screener</span>
      </a>
      
      <ul class="navbar-nav">
        <li class="navbar-item">
          <a class="nav-link" (click)="logout()">
            <fa-icon class="logout-icon fa-1x" [icon]="faSignOutAlt"></fa-icon>
          </a>
        </li>
      </ul>
    </nav>
  `
})
export class LayoutHeaderComponent implements OnInit {

  private sideNav: HTMLElement;
  private main: HTMLElement; 
  private active: boolean;
  private activeCls = 'active';
  /** Font Awesome sign out icon */
  faSignOutAlt = faSignOutAlt;
  
  /**
   * Create a LayoutHeaderComponent
   * @param router 
   * @param authService 
   * @param renderer 
   * @param document 
   */
  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document) {}

  /**
   * Listen for resize events.
   */
  @HostListener('window:resize')
  onResize() {
    this.checkActive();
  }

  ngOnInit() {
    this.sideNav = this.document.getElementById('sidebar');
    this.main = this.document.getElementById('main');

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationEnd: {
          this.checkActive();
          break;
        }
      }
    });
    this.checkActive();
  }

  /**
   * Check if menu active.
   */
  checkActive() {
    if (window.innerWidth >= 768) {
      this.setActive();
    } else{
      this.setInactive();
    }
  }

  /**
   * Make menu active.
   */
  setActive() {
    this.renderer.addClass(this.sideNav, this.activeCls);
    this.renderer.addClass(this.main, this.activeCls);
  }

  /**
   * Make menu inactive.
   */
  setInactive() {
    this.renderer.removeClass(this.sideNav, this.activeCls);
    this.renderer.removeClass(this.main, this.activeCls);
  }

  /**
   * Toggle menu active state.
   */
  toggleNav() {
    this.active = this.sideNav.classList.contains(this.activeCls);
    
    if (this.active) {
      this.setInactive();
    } else {
      this.setActive();
    }
  }

  /**
   * Log out user.
   */
  logout() {
    this.authService.logout().subscribe((res: HttpResult) => {
      if (res.isSuccess()) {
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

}

/**
 * Class representing a LayoutContentComponent.
 */
@Component({
  selector: 'app-layout-content',
  template: `
    <ng-content></ng-content>
  `
})
export class LayoutContentComponent {

  constructor() { }

}

/**
 * Class representing a LayoutFooterComponent.
 */
@Component({
  selector: 'app-layout-footer',
  template: `
    <ng-content></ng-content>
  `
})
export class LayoutFooterComponent {

  constructor() { }

}

/**
 * Class representing a LayoutSidebarComponent.
 */
@Component({
  selector: 'app-layout-sidebar',
  template: `
    <nav class="sidebar bg-dark" id="sidebar">
      <ul>
        <ng-container *ngFor="let item of items">
          <li>
            <ng-container *ngIf="!item.children">
              <a href="#{{item.id}}" routerLink="{{item.path}}" 
                routerLinkActive="active">
                <fa-icon [icon]="item.icon" class="mr-2"></fa-icon>{{item.title}}
              </a>
            </ng-container>
            <ng-container *ngIf="item.children">
              <a href="#{{item.id}}"
                aria-expanded="false" class="dropdown-toggle" data-toggle="collapse">
                <fa-icon [icon]="item.icon"></fa-icon> {{item.title}}
              </a>
              <ul class="collapse" id="{{item.id}}">
                <li *ngFor="let child of item.children">
                  <a routerLink="{{child.path}}"> {{child.title}}</a>
                </li>
              </ul>
            </ng-container>
          </li>
        </ng-container>
      </ul>
    </nav>
  `
})
export class LayoutSidebarComponent {

  /** menu items */
  @Input() items:MenuItem; 

  constructor() { }

}

/**
 * Class representing a LayoutComponent.
 */
@Component({
  selector: 'app-layout',
  template: `
    <ng-content select="app-layout-header"></ng-content>
    <div class="container-fluid layout">
      <ng-content select="app-layout-sidebar"></ng-content>
      <main id="main" class="wrapper d-flex flex-column">
        <ng-content select="app-layout-content"></ng-content>  
        <footer>
          <ng-content select="app-layout-footer"></ng-content> 
        </footer>
      </main>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

  constructor(private spinnerService: SpinnerService) { }

  ngAfterViewInit() {
    this.spinnerService.hide();
  }

}

/**
 * Class representing a LayoutCardHeaderComponent.
 */
@Component({
  selector: 'app-layout-card-header',
  template: `<ng-content></ng-content>`
})
export class LayoutCardHeaderComponent {

  constructor() { }

}

/**
 * Class representing a LayoutCardBodyComponent.
 */
@Component({
  selector: 'app-layout-card-body',
  template: `<ng-content></ng-content>`
})
export class LayoutCardBodyComponent {

  constructor() { }

}


/**
 * Class representing a LayoutCardFooterComponent.
 */
@Component({
  selector: 'app-layout-card-footer',
  template: `<ng-content></ng-content>`
})
export class LayoutCardFooterComponent {

  constructor() { }

}


/**
 * Class representing a LayoutCardComponent.
 */
@Component({
  selector: 'app-layout-card',
  template: `
    <ng-content select="app-layout-card-header"></ng-content>
    <ng-content select="app-layout-card-body"></ng-content>
    <ng-content select="app-layout-card-footer"></ng-content>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutCardComponent {

  constructor() { }

}

