import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { FilterPipe } from './pipes/filter.pipe';
import { QuestionAddEditFormComponent } from './question-add-edit-form/question-add-edit-form.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { MiscModule } from '../misc/misc.module';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MiscModule,
    LayoutModule
  ],
  declarations: [
    QuestionsComponent, 
    FilterPipe, 
    QuestionAddEditFormComponent, 
    QuestionsListComponent
  ]
})
export class QuestionsModule { }
