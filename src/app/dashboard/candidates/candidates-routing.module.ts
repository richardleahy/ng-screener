import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { 
  CandidateAddEditFormComponent 
} from './candidate-add-edit-form/candidate-add-edit-form.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidateScreenComponent } from './candidate-screen/candidate-screen.component';

/**
 * Candidate routes.
 */
const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    children:[
      {
        path:'new',
        component: CandidateAddEditFormComponent
      },
      {
        path:'detail/:id',
        component: CandidateAddEditFormComponent
      },
      {
        path:'screen/:id',
        component: CandidateScreenComponent
      },
      {
        path:'',
        component: CandidatesListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
