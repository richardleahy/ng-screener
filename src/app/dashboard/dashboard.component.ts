import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../layout/menu-item';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

/**
 * Class representing a DashboardComponent.
 */
@Component({
  selector: 'app-dashboard',
  template: `
    <app-layout>
      <app-layout-header></app-layout-header>
      <app-layout-sidebar [items]="menu"></app-layout-sidebar>
      <app-layout-content>
        <router-outlet></router-outlet>
      </app-layout-content>
      <app-layout-footer>Copyright &copy; 2018, Richard Leahy, All rights reserved.</app-layout-footer>
    </app-layout>
  `
})
export class DashboardComponent implements OnInit {
  
  /**
   * menu items.
   * @type {MenuItem[]}
   */
  menu: MenuItem[] = [
    {
      title: 'Home',
      icon: faHome,
      path: 'home'
    },
    {
      title: 'Categories',
      icon: faListAlt,
      path: 'categories'
    },
    {
      title: 'Questions',
      icon: faQuestion,
      path: 'questions'
    },
    {
      title: 'Screens',
      icon: faDesktop,
      path: 'screens'
    },
    {
      title: 'Candidates',
      icon: faUser,
      path: 'candidates'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
