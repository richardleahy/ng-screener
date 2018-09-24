import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { ScreensRoutingModule } from './screens-routing.module';
import { ScreensComponent } from './screens.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ScreenAddEditFormComponent } from './screen-add-edit-form/screen-add-edit-form.component';
import { ScreensListComponent } from './screens-list/screens-list.component';
import { MiscModule } from '../misc/misc.module';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    ScreensRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MiscModule,
    LayoutModule
  ],
  declarations: [
    ScreensComponent, 
    FilterPipe, 
    ScreenAddEditFormComponent, 
    ScreensListComponent
  ]
})
export class ScreensModule { }
