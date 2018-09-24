import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './services/spinner.service';
import { StorageService } from './services/storage.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule { 
  /* Tell angular to inject coreModule into itself.
     SkipSelf - look for it in ancestor injectors not this one
     Optional - Injector will throw error if it can't find requested provider
     so set optional as not finding it is ok. */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.');
    }
  }

  /* Prevent duplication of provided services when loaded into root and child modules.
  forRoot will be called in importing module AppModule, registering the providers there.
  if module get imported by child modules / injectors, the services won't get duplicated using this
  pattern. */
  static forRoot(): ModuleWithProviders {
    /* ModuleWithProviders - wrapper around ngModule that
    associates the module with providers */
    return {
      ngModule: CoreModule,
      providers: [SpinnerService, StorageService]
    }
  }
}
