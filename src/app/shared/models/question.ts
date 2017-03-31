export interface IQuestion {
    question: string;
    answer: string;
}

export interface IMultipleChoice extends IQuestion {
    question: string;
    options: string[];
    answer: string;
}

export interface IFillInTheBlank extends IQuestion {
    question: string;
    answer: string;
}

export interface ILongAnswer extends IQuestion {
    question: string;
    answer: string;
}
