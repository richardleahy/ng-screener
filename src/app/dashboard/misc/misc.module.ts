import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscRoutingModule } from './misc-routing.module';
import { ErrorComponent } from './error/error.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    MiscRoutingModule,
    FontAwesomeModule
  ],
  declarations: [ErrorComponent, SpinnerComponent],
  exports : [ErrorComponent, SpinnerComponent]
})
export class MiscModule { }
