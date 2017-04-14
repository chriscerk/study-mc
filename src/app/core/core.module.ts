import { ReviewService } from './services/review/review.service';
import { LearnService } from './services/learn/learn.service';
import { TestService } from './services/test/test.service';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { CourseService } from './services/course/course.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from '../shared/ensureModuleLoadedOnceGuard';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [ CommonModule, RouterModule, HttpModule ],
  declarations: [ NavbarComponent ],
  exports: [ NavbarComponent, RouterModule, HttpModule ],
  providers: [ ErrorHandlerService, CourseService, TestService, LearnService, ReviewService ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  //Looks for the module in the parent to see if already loaded
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
