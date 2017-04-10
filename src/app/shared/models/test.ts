import { IMultipleChoice } from './question';

export interface ITestItem {
    title: string;
    topicName: string;
    courseId: number;
}

export class TestProblem implements ITestItem, IMultipleChoice {
    topicName: string;
    courseId: number;
    title: string;
    question: string;
    options: string[];
    answer: string;
    isLocked: boolean;
}
