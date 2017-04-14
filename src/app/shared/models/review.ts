export interface IReviewItem {
    key: string;
    isLocked: boolean;
    title: string;
    sections: ISection[];
    topicName: string;
    courseId: number;
}

export interface ISection {
    title: string;
    content: string;
    imagePath: string;
}
