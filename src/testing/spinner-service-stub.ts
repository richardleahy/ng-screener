import { SpinnerService } from "../app/core/services/spinner.service";

let spinnerServiceStub: Partial<SpinnerService>;

/** Spinner stub. */
export default spinnerServiceStub = {
    /**
     * Show the spinner.
     */
    show() {},
    /**
     * Hide the spinner.
     */
    hide() {}
};