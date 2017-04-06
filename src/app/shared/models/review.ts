export interface IReviewItem {
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
