import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreensComponent } from './screens.component';
import { ScreenAddEditFormComponent } from './screen-add-edit-form/screen-add-edit-form.component';
import { ScreensListComponent } from './screens-list/screens-list.component';

/** Screen child routes. */
const routes: Routes = [
  {
    path: '',
    component: ScreensComponent,
    children:[
      {
        path:'new',
        component: ScreenAddEditFormComponent
      },
      {
        path:'detail/:id',
        component: ScreenAddEditFormComponent
      },
      {
        path:'',
        component: ScreensListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule { }
