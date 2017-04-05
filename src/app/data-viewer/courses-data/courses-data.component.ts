import { ITopic } from './../../shared/models/topic';
import { ICourse } from './../../shared/models/course';
import { CourseService } from './../../core/services/course/course.service';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

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
    afCourses: FirebaseListObservable<any[]>;
    currentCourse: ICourse;
    currentTopic: ITopic;
    currentRef: any;
    editBoxDisplayed: boolean;

  constructor(private courseService: CourseService,
    private af: AngularFire) { }

  ngOnInit() {
    this.courseService.getCourses()
    .subscribe((courses: ICourse[]) => {
        this.courses = this.searchedCourses = courses;
    });

    this.afCourses = this.af.database.list('/courses');
    this.currentCourse = { 'id': null, 'name': null, 'status': null, 'topics': [null], 'abbreviation': null, 'number': null };
    this.currentTopic = {
        'id': null,
        'name': null,
        'status': null,
        'title': null,
        'learnItems': null,
        'testItems': null,
        'reviewItems': null,
        'exampleReview': null
    }
  }

    addCourse() {
        const key = this.afCourses.push(this.currentCourse).key;
        this.currentCourse.number = key;
        this.afCourses.$ref.ref.child(key).update(this.currentCourse);
        this.editBoxDisplayed = false;
    }

    deleteCourse(key: string) {
        this.afCourses.remove(key);
    }

    updateCourse(key: string, course: ICourse) {
        this.afCourses.$ref.ref.child(key).update(course);
    }

  filterResults() {
        if (this.searchTerm && this.courses) {
            const props = ['status', 'name'];
            const filtered = this.courses.filter(u => {
                let match = false;
                for (const prop of props) {
                    const value = u[prop];
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
