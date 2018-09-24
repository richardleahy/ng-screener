import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

/**
 * Dashboard routes.
 */
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'categories',
        loadChildren: './categories/categories.module#CategoriesModule'
      },
      {
        path: 'questions',
        loadChildren: './questions/questions.module#QuestionsModule'
      },
      {
        path: 'screens',
        loadChildren: './screens/screens.module#ScreensModule'
      },
      {
        path: 'candidates',
        loadChildren: './candidates/candidates.module#CandidatesModule'
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
