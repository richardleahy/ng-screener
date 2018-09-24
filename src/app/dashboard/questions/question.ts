import { Category } from "../categories/category";

/**
 * Class representing a Question.
 */
export class Question {
    pk?: number;
    /** question */
    question: string;
    /** categories question associated to */
    categories?: Category[]
}
