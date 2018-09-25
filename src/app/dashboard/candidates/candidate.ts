import { Screen } from "../screens/screen";

/**
 * Class representing a Candidate.
 */
export class Candidate {
    pk?: number;
    first_name: string;
    surname: string;
    email: string;
    /** Screen association */
    screen?: Screen;
    screen_pk?: number;
    screen_name?: string;
}
