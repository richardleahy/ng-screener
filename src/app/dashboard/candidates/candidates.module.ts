import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesComponent } from './candidates.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CandidateAddEditFormComponent } from './candidate-add-edit-form/candidate-add-edit-form.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { MiscModule } from '../misc/misc.module';
import { LayoutModule } from '../../layout/layout.module';
import { CandidateScreenComponent } from './candidate-screen/candidate-screen.component';

@NgModule({
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MiscModule,
    LayoutModule
  ],
  declarations: [
    CandidatesComponent, 
    FilterPipe, 
    CandidateAddEditFormComponent, 
    CandidatesListComponent, CandidateScreenComponent
  ]
})
export class CandidatesModule { }
