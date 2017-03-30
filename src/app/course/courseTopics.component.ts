import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ITopic } from '../shared/interfaces';
import { ICourse } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({
  //moduleId: module.id,
  selector: 'course-learn',
  templateUrl: 'courseTopics.component.html'
})
export class CourseTopicsComponent implements OnInit {

  course: ICourse;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private dataService: DataService) { } 

  ngOnInit() {
      this.sub = this.route.parent.params.subscribe(params => {
        let id = +params['id'];
        this.dataService.getCourse(id)
            .subscribe((course: ICourse) => this.course = course);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}