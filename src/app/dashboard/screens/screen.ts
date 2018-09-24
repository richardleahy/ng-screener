import { Question } from "../questions/question";

/**
 * Class representing a Screen.
 */
export class Screen {
    pk?: number;
    /** screen name */
    name: string;
    /** associated questions */
    questions: Question[]
}
