import { TestService } from './../../core/services/test/test.service';
import { ITestItem } from './../../shared/models/test';
import { CourseService } from './../../core/services/course/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['../data-viewer.component.css']
})
export class TestDataComponent implements OnInit {
    testItems: ITestItem[] = [];
    searchedTestItems: ITestItem[] = [];
    filterProperties = ['topicName','courseId', 'question', 'options'];
    searchPlaceholder = 'Search by: ' + this.filterProperties + '...';
    searchTerm: string;
    isLoading: boolean;

  constructor(private testService: TestService) { }

  ngOnInit() {
       this.testService.getTestItems()
        .subscribe((testItems: ITestItem[]) => {
          this.testItems = this.searchedTestItems = testItems;
        });
  }

  filterResults() {
        if (this.searchTerm && this.testItems) {
            const props = this.filterProperties;
            let filtered = this.testItems.filter(u => {
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
            this.searchedTestItems = filtered;
            this.isLoading = false;
        } else {
            this.searchedTestItems = this.testItems;
            this.isLoading = false;
        }
    }

    filterChanged() {
        this.isLoading = true;
        this.filterResults();
    }

}
