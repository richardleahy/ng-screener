import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { QuestionAddEditFormComponent } from './question-add-edit-form/question-add-edit-form.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';

/**
 * Question child routes.
 */
const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    children:[
      {
        path:'new',
        component: QuestionAddEditFormComponent
      },
      {
        path:'detail/:id',
        component: QuestionAddEditFormComponent
      },
      {
        path:'',
        component: QuestionsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
