import { ICourse } from './../../shared/models/course';
import { CourseService } from './../../core/services/course/course.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private courseService: CourseService) { }

  ngOnInit() {
       this.courseService.getCourses()
        .subscribe((courses: ICourse[]) => {
          this.courses = this.searchedCourses = courses;
        });
  }

  filterResults() {
        if (this.searchTerm && this.courses) {
            const props = ['status', 'name'];
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
