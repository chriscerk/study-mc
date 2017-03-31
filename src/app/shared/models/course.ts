import { ITopic } from './topic';

export interface ICourse {
    id: number;
    status: string;
    name: string;
    abbreviation: string;
    number: string;
    topics: ITopic[];
}

