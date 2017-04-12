import { ViewChild } from '@angular/core';
import { ICourse } from './../../shared/models/course';
import { ITopic } from './../../shared/models/topic';
import { CourseService } from './../../core/services/course/course.service';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { NgForm } from '@angular/forms';

enum CurrentAction {'View', 'Edit', 'Add'};

@Component({
  selector: 'courses-data',
  templateUrl: './courses-data.component.html',
  styleUrls: ['../data-viewer.component.css']
})
export class CoursesDataComponent implements OnInit {
    afCourses: FirebaseListObservable<ICourse[]>;
    courses: ICourse[] = [];
    searchedCourses: ICourse[] = [];

    searchTerm: string;
    isLoading: boolean;
    filterProperties = ['id', 'status', 'name'];
    searchPlaceholder = 'Search by: ' + this.filterProperties + '...';

    currentCourse: ICourse;
    currentCourseKey: string;
    CurrentAction: typeof CurrentAction = CurrentAction;
    action: CurrentAction;


  constructor(private courseService: CourseService,
    private af: AngularFire) { }

  ngOnInit() {
    this.af.database.list('/courses').subscribe(
        (courses: ICourse[]) => {
            this.courses = this.searchedCourses = courses;
        }
    );
    this.action = CurrentAction.View;
    this.afCourses = this.af.database.list('/courses');
    this.currentCourse = {
        'id': null,
        'name': null,
        'status': null,
        'topics': [],
        'number': null,
        'isLocked': false,
    };
  }

   submit() {
      if(this.action == CurrentAction.Add) {
          this.addCourse();
      }
      else if(this.action == CurrentAction.Edit) {
          this.updateCourse();
      }
   }

    addCourse() {
        const key = this.afCourses.push(this.currentCourse).key;
        this.currentCourse.number = key;
        this.afCourses.$ref.ref.child(key).update(this.currentCourse);
        this.action = CurrentAction.View;
        this.resetCurrentCourse();
    }

    updateCourse() {
        this.afCourses.$ref.ref.child(this.currentCourseKey).update(this.currentCourse);
        this.action = CurrentAction.View;
        this.resetCurrentCourse();
    }

    setEditKey(key: string) {
        this.action = CurrentAction.Edit;
        this.currentCourseKey = key;
        let afObject = this.af.database.object('/courses/' + key);
        afObject.subscribe((course: ICourse) => { this.currentCourse = course; });
    }

    addTopic() {
        this.currentCourse.topics.push({'name': null, 'status': null});
    }

    removeTopic() {
        this.currentCourse.topics.pop();
    }

    deleteCourse(key: string) {
        this.afCourses.remove(key);
    }

    cancelAction() {
        this.action = CurrentAction.View;
        this.resetCurrentCourse();
    }

    resetCurrentCourse() {
        this.currentCourse = {
            'id': null,
            'name': null,
            'status': null,
            'topics': [],
            'number': null,
            'isLocked': false,
        };
    }

  filterResults() {
        if (this.searchTerm && this.courses) {
             const props = this.filterProperties;
            let filtered = this.courses.filter(u => {
                let match = false;
                for (let prop of props) {
                    let value = u[prop];
                    if (value.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
                        match = true;
                        break;
                    }
                };
                return match;
            });
            this.searchedCourses = filtered;
            this.isLoading = false;
        } else {
            this.searchedCourses = this.courses;
            this.isLoading = false;
        }
    }

    filterChanged() {
        this.isLoading = true;
        this.filterResults();
    }

}
