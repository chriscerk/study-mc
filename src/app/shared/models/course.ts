import { ITopic } from './topic';

export interface ICourse {
    id: number;
    status: string;
    isLocked: boolean;
    name: string;
    number: string;
    topics: ITopic[];
}
