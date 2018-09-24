import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { HomeCategoriesComponent } from './home-categories/home-categories.component';
import { HomeQuestionsComponent } from './home-questions/home-questions.component';
import { HomeScreensComponent } from './home-screens/home-screens.component';
import { HomeCandidatesComponent } from './home-candidates/home-candidates.component';
import { LayoutModule} from '../../layout/layout.module';
import {RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoundProgressModule,
    LayoutModule,
    RouterModule
  ],
  declarations: [
    HomeComponent, 
    HomeCategoriesComponent, 
    HomeQuestionsComponent, 
    HomeScreensComponent, 
    HomeCandidatesComponent]
})
export class HomeModule { }
