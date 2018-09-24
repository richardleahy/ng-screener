import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService} from './interceptors/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  declarations: [AuthComponent, LoginComponent]
})
export class AuthModule { 

    /* Prevent duplication of provided services when loaded into root and child modules.
  forRoot will be called in importing module AppModule, registering the providers there.
  if module get imported by child modules / injectors, the services won't get duplicated using this
  pattern. */
  static forRoot(): ModuleWithProviders {
    /* ModuleWithProviders - wrapper around ngModule that
    associates the module with providers */
    return {
      ngModule: AuthModule,
      providers:[
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}
      ]
    }
  }
}
