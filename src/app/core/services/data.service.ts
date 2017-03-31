import { ITopic } from './../../shared/models/topic';
import { ICourse } from './../../shared/models/course';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    _baseUrl: string = 'assets/data/';
    courses: ICourse[];
    topics: ITopic[];

    constructor(private http: Http) { }

    getCourses(): Observable<ICourse[]> {
        if (!this.courses) {
            return this.http.get(this._baseUrl + 'courses.json')
                        .map((res: Response) => {
                            this.courses = res.json();
                            return this.courses;
                        })
                        .catch(this.handleError);
        }
        else {
            //return cached data
            return this.createObservable(this.courses);
        }
    }

    getCourse(id: number) : Observable<ICourse> {
        if (this.courses) {
            //filter using cached data
            return this.findCourseObservable(id);
        } else {
            //Query the existing courses to find the target course
            return Observable.create((observer: Observer<ICourse>) => {
                    this.getCourses().subscribe((courses: ICourse[]) => {
                        this.courses = courses;                
                        const cust = this.filterCourses(id);
                        observer.next(cust);
                        observer.complete();
                })
            })
            .catch(this.handleError);
        }
    }

    getTopics() : Observable<ITopic[]> {
        if (!this.topics) {
            return this.http.get(this._baseUrl + 'topics.json')
                        .map((res: Response) => {
                            this.topics = res.json();
                            return this.topics;
                        })
                        .catch(this.handleError);
        }
        else {
            //return cached data
            return this.createObservable(this.topics);
        }
    }

    getTopic(id: number) : Observable<ITopic> {
        if (this.topics) {
            //filter using cached data
            return this.findTopicObservable(id);
        } else {
            //Query the existing topics to find the target course
            return Observable.create((observer: Observer<ITopic>) => {
                    this.getTopics().subscribe((topics: ITopic[]) => {
                        this.topics = topics;                
                        const cust = this.filterTopics(id);
                        observer.next(cust);
                        observer.complete();
                })
            })
            .catch(this.handleError);
        }
    }

    private filterCourses(id: number) : ICourse {
        const cs = this.courses.filter((c) => c.id === id);
        return (cs.length) ? cs[0] : null;
    }

    private findCourseObservable(id: number) : Observable<ICourse> {
        return this.createObservable(this.filterCourses(id));
    }

    private filterTopics(id: number) : ITopic {
        const cs = this.topics.filter((c) => c.id === id);
        return (cs.length) ? cs[0] : null;
    }

    private findTopicObservable(id: number) : Observable<ITopic> {
        return this.createObservable(this.filterTopics(id));
    }

    private createObservable(data: any) : Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next(data);
            observer.complete();
        });
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}