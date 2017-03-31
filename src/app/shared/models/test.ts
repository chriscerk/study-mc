import { IMultipleChoice } from './question';

export interface ITestItem {
    title: string;
}

export class TestProblem implements ITestItem, IMultipleChoice {
    title: string;
    question: string;
    options: string[];
    answer: string;
}
