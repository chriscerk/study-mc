import { IReviewItem } from './../../shared/models/review';
import { about_routing } from './../../about/about.routing';
import { ICourse } from './../../shared/models/course';
import { ITopic } from './../../shared/models/topic';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TestService } from './../../core/services/test/test.service';
import { CourseService } from './../../core/services/course/course.service';
import { Component, OnInit } from '@angular/core';

enum CurrentAction {'View', 'Edit', 'Add'};

@Component({
  selector: 'test-data',
  templateUrl: './review-data.component.html',
  styleUrls: ['../data-viewer.component.css']
})
export class ReviewDataComponent implements OnInit {
    reviewItems: IReviewItem[] = [];
    afReviewItems: FirebaseListObservable<any[]>;
    courses: ICourse[] = [];
    topics: ITopic[] = [];

    searchedTestItems: IReviewItem[] = [];
    filterProperties = ['topicName', 'courseId', 'title'];
    searchPlaceholder = 'Search by: ' + this.filterProperties + '...';
    searchTerm: string;
    isLoading: boolean;

    currentReviewItem: IReviewItem;
    currentReviewItemKey: string;
    CurrentAction: typeof CurrentAction = CurrentAction;
    action: CurrentAction;

    constructor(private testService: TestService, private af: AngularFire) { }

    ngOnInit() {
        this.af.database.list('/courses').subscribe(
            (courses: ICourse[]) => {
                this.courses = courses;
            }
        );
        this.af.database.list('/reviews').subscribe(
            (items: IReviewItem[]) => {
                this.reviewItems = this.searchedTestItems = items;
            }
        );
        this.afReviewItems = this.af.database.list('/reviews');
        this.action = CurrentAction.View;
        this.resetReviewItem();
    }

    submit() {
        if(this.action == CurrentAction.Add) {
            this.addReviewItem();
        }
        else if(this.action == CurrentAction.Edit) {
            this.updateReviewItem();
        }
    }

    getTopicsByCourse() {
        this.courses.forEach(course => {
            if(course.id == this.currentReviewItem.courseId) {
                this.topics = course.topics;
                return;
            }
        });
    }

    addReviewItem() {
        const key = this.afReviewItems.push(this.currentReviewItem).key;
        this.currentReviewItem.key = key;
        this.afReviewItems.$ref.ref.child(key).update(this.currentReviewItem);
        this.action = CurrentAction.View;
        this.resetReviewItem();
    }

    updateReviewItem() {
        this.afReviewItems.$ref.ref.child(this.currentReviewItemKey).update(this.currentReviewItem);
        this.action = CurrentAction.View;
        this.resetReviewItem();
    }

    setEditKey(key: string) {
        this.action = CurrentAction.Edit;
        this.currentReviewItemKey = key;
        let afObject = this.af.database.object('/reviews/' + key);
        afObject.subscribe((reviewItem: IReviewItem) => { this.currentReviewItem = reviewItem; });
    }

    addOption() {
        this.currentReviewItem.sections.push({'title': '', 'content': '', 'imagePath': ''});
    }

    removeOption() {
        this.currentReviewItem.sections.pop();
    }

    deleteReviewItem(key: string) {
        this.afReviewItems.remove(key);
    }

    cancelAction() {
        this.action = CurrentAction.View;
        this.resetReviewItem();
    }

    resetReviewItem() {
        this.currentReviewItem = {
            'key': null,
            'topicName': null,
            'courseId': null,
            'title': null,
            'sections': [],
            'isLocked': false
        };
    }

  filterResults() {
        if (this.searchTerm && this.reviewItems) {
            const props = this.filterProperties;
            let filtered = this.reviewItems.filter(u => {
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
            this.searchedTestItems = this.reviewItems;
            this.isLoading = false;
        }
    }

    filterChanged() {
        this.isLoading = true;
        this.filterResults();
    }
}
