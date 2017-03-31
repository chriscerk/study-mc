export interface IReviewItem {
    title: string;
    sections: ISection[];
}

export interface ISection {
    title: string;
    content: string;
    imagePath: string;
}
