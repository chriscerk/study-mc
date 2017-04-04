import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { CourseService } from './services/course/course.service';
import { TestQuestionService } from './services/test-question/test-question.service';
import { ReviewSheetService } from './services/review-sheet/review-sheet.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from '../shared/ensureModuleLoadedOnceGuard';
import { DataService } from './services/data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [ CommonModule, RouterModule, HttpModule ],
  declarations: [ NavbarComponent ],
  exports: [ NavbarComponent, RouterModule, HttpModule ],
  providers: [ ErrorHandlerService, DataService, ReviewSheetService, TestQuestionService, CourseService ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  //Looks for the module in the parent injector to see if it's already been loaded
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
