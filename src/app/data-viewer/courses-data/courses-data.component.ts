import { ViewChild } from '@angular/core';
import { ICourse } from './../../shared/models/course';
import { ITopic } from './../../shared/models/topic';
import { CourseService } from './../../core/services/course/course.service';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'courses-data',
  templateUrl: './courses-data.component.html',
  styleUrls: ['../data-viewer.component.css']
})
export class CoursesDataComponent implements OnInit {
    courses: ICourse[] = [];
    searchedCourses: ICourse[] = [];
    searchTerm: string;
    isLoading: boolean;
    filterProperties = ['id', 'status', 'name'];
    searchPlaceholder = 'Search by: ' + this.filterProperties + '...';
    afCourses: FirebaseListObservable<ICourse[]>;
    currentCourse: ICourse;
    editBoxDisplayed: boolean;
    @ViewChild('coursesForm') coursesForm: NgForm;

  constructor(private courseService: CourseService,
    private af: AngularFire) { }

  ngOnInit() {
    this.af.database.list('/courses').subscribe(
        (courses: ICourse[]) => {
            this.courses = this.searchedCourses = courses;
        }
    );

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

    addCourse() {
        const key = this.afCourses.push(this.currentCourse).key;
        this.currentCourse.number = key;
        this.afCourses.$ref.ref.child(key).update(this.currentCourse);
        this.editBoxDisplayed = false;
        this.resetCurrentCourse();
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

    updateCourse(key: string, course: ICourse) {
        this.afCourses.$ref.ref.child(key).update(course);
    }

    cancelAction() {
        this.resetCurrentCourse();
        this.editBoxDisplayed = false;
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
