import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ITopic } from '../shared/interfaces';
import { ICourse } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({
  //moduleId: module.id,
  selector: 'course-learn',
  template: `
    <div *ngIf="course">
        <div class="row">
        <h1>Course Topics for {{course.abbreviation}} - {{course.number}} </h1><br><br>

        <ul class="flex-container"> 
        <div *ngFor="let topic of course.topics;">
            <a [routerLink]="['/studymc/topic', topic.id,'learn']" class="{{topic.status + '-link' }}">
                <li class="flex-item topicBox hvr-back-pulse {{topic.status + '-course' }}">{{topic.title}}</li>
            </a>
        </div>
        <div *ngIf="!course.topics.length">
            <h1>No Topics!</h1>
        </div>
        </ul>

    </div>   
    <div *ngIf="!course" class="row">
        No course found
    </div>  
`
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