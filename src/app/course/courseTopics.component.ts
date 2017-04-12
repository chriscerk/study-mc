import { CourseService } from './../core/services/course/course.service';
import { ICourse } from './../shared/models/course';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'course-topics',
  templateUrl: 'courseTopics.component.html',
  styleUrls: ['courseTopics.component.css']
})
export class CourseTopicsComponent implements OnInit {

  course: ICourse;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
      this.sub = this.route.parent.params.subscribe(params => {
        let id = +params['id'];
        this.courseService
            .getFirebaseCourse(id)
            .subscribe((course: ICourse) => this.course = course);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
