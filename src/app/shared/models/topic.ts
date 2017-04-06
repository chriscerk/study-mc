import { IReviewItem } from './review';
import { ITestItem } from './test';
import { ILearnItem } from './learn';

export interface ITopic {
    name: string;
    status: string;
}

export interface IOldTopic {
    id: number;
    title: string;
    name: string;
    status: string;
    learnItems: ILearnItem[];
    testItems: ITestItem[];
    reviewItems: IReviewItem[];
    exampleReview: IReviewItem[];
}
