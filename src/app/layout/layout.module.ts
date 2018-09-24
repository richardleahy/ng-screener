import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LayoutComponent, 
  LayoutHeaderComponent, 
  LayoutFooterComponent, 
  LayoutContentComponent, 
  LayoutSidebarComponent,
  LayoutCardComponent,
  LayoutCardHeaderComponent,
  LayoutCardBodyComponent,
  LayoutCardFooterComponent
} from './layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {RouterModule } from '@angular/router';

const LAYOUT_COMPONENTS = [
  LayoutComponent,
  LayoutHeaderComponent,
  LayoutFooterComponent,
  LayoutContentComponent,
  LayoutSidebarComponent,
  LayoutCardComponent,
  LayoutCardHeaderComponent,
  LayoutCardBodyComponent,
  LayoutCardFooterComponent
];

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  declarations: [...LAYOUT_COMPONENTS],
  exports: [...LAYOUT_COMPONENTS]
})
export class LayoutModule { }
