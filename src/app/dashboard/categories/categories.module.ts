import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { FormsModule } from '@angular/forms';
//import { ContenteditableDirective} from 'ng-contenteditable';
import { LayoutModule} from '../../layout/layout.module';
import { ContenteditableModule} from 'ng-contenteditable';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FontAwesomeModule,
    FormsModule,
    LayoutModule,
    ContenteditableModule
  ],
  declarations: [CategoriesComponent]
  //declarations: [CategoriesComponent, ContenteditableDirective]
})
export class CategoriesModule { }
