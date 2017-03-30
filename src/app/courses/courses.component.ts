import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICourse } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({ 
  selector: 'courses',
  templateUrl: 'courses.component.html'
})
export class CoursesComponent implements OnInit {

  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];

  appTitle: string;
  college: string;
  university: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.appTitle = 'StudyMC';
    this.college = 'College of Pharmacy';
    this.university = 'University of Michigan';

     this.dataService.getCourses()
        .subscribe((courses: ICourse[]) => {
          this.courses = this.filteredCourses = courses;
        });
  }
}
