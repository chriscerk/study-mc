import { IMultipleChoice, Option } from './question';

export interface ITestItem {
    title: string;
    topicName: string;
    courseId: number;
}

export class TestProblem implements ITestItem, IMultipleChoice {
    key: string;
    topicName: string;
    courseId: number;
    title: string;
    question: string;
    options: Option[];
    answer: string;
    isLocked: boolean;
}
