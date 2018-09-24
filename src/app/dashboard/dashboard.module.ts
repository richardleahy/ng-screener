import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeModule } from './home/home.module';
import { DashboardComponent } from './dashboard.component';
import { LayoutModule } from '../layout/layout.module';
import { MiscModule } from './misc/misc.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HomeModule,
    LayoutModule,
    MiscModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
