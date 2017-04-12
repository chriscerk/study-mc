import { about_routing } from './../../about/about.routing';
import { ICourse } from './../../shared/models/course';
import { ITopic } from './../../shared/models/topic';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TestService } from './../../core/services/test/test.service';
import { ITestItem, TestProblem } from './../../shared/models/test';
import { CourseService } from './../../core/services/course/course.service';
import { Component, OnInit } from '@angular/core';

enum CurrentAction {'View', 'Edit', 'Add'};

@Component({
  selector: 'test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['../data-viewer.component.css']
})
export class TestDataComponent implements OnInit {
    testItems: ITestItem[] = [];
    afTestProblems: FirebaseListObservable<any[]>;
    courses: ICourse[] = [];
    topics: ITopic[] = [];

    searchedTestItems: ITestItem[] = [];
    filterProperties = ['topicName', 'courseId', 'question', 'answer'];
    searchPlaceholder = 'Search by: ' + this.filterProperties + '...';
    searchTerm: string;
    isLoading: boolean;

    currentTestProblem: TestProblem;
    currentTestProblemKey: string;
    CurrentAction: typeof CurrentAction = CurrentAction;
    action: CurrentAction;

    constructor(private testService: TestService, private af: AngularFire) { }

    ngOnInit() {
        this.af.database.list('/courses').subscribe(
            (courses: ICourse[]) => {
                this.courses = courses;
            }
        );
        this.af.database.list('/testproblems').subscribe(
            (items: ITestItem[]) => {
                this.testItems = this.searchedTestItems = items;
            }
        );
        this.afTestProblems = this.af.database.list('/testproblems');
        this.action = CurrentAction.View;
        this.resetTestProblem();
    }

    submit() {
        if(this.action == CurrentAction.Add) {
            this.addTestProblem();
        }
        else if(this.action == CurrentAction.Edit) {
            this.updateTestProblem();
        }
    }

    getTopicsByCourse() {
        this.courses.forEach(course => {
            if(course.id == this.currentTestProblem.courseId) {
                this.topics = course.topics;
                return;
            }
        });
    }

    addTestProblem() {
        const key = this.afTestProblems.push(this.currentTestProblem).key;
        this.currentTestProblem.key = key;
        this.afTestProblems.$ref.ref.child(key).update(this.currentTestProblem);
        this.action = CurrentAction.View;
        this.resetTestProblem();
    }

    updateTestProblem() {
        this.afTestProblems.$ref.ref.child(this.currentTestProblemKey).update(this.currentTestProblem);
        this.action = CurrentAction.View;
        this.resetTestProblem();
    }

    setEditKey(key: string) {
        this.action = CurrentAction.Edit;
        this.currentTestProblemKey = key;
        let afObject = this.af.database.object('/testproblems/' + key);
        afObject.subscribe((testProblem: TestProblem) => { this.currentTestProblem = testProblem; });
    }

    addOption() {
        this.currentTestProblem.options.push({'value': ''});
    }

    removeOption() {
        this.currentTestProblem.options.pop();
    }

    deleteTestProblem(key: string) {
        this.afTestProblems.remove(key);
    }

    cancelAction() {
        this.action = CurrentAction.View;
        this.resetTestProblem();
    }

    resetTestProblem() {
        this.currentTestProblem = {
            'key': null,
            'topicName': null,
            'courseId': null,
            'title': null,
            'question': null,
            'options': [],
            'answer': null,
            'isLocked': false
        };
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
                }
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
