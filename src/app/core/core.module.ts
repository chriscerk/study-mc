import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from '../shared/ensureModuleLoadedOnceGuard';
import { DataService } from './services/data.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [CommonModule],
  providers: [DataService] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  //Looks for the module in the parent injector to see if it's already been loaded
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
