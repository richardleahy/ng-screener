/** Class representing a HttpResult. */
export class HttpResult {

    /**
     * Create a HttpResult.
     * @param {boolean} success - request success.
     * @param {any} response - request response.
     */
    constructor(
        private success: boolean,
        private response?: any
    ) { }

    /**
     * Bundle up request error response.
     * @returns {object}
     */
    getErrors() {
        return {
            errors: this.getBodyError(),
            statusText: this.getStatusText(),
            statusCode: this.getStatus()
        };
    }

    /**
     * Get the http response.
     */
    getResponse() {
        return this.response;
    }

    /**
     * Get the http status.
     */
    getStatus(): number {
        return this.response.status;
    }

    /**
     * Get the http status text.
     */
    getStatusText(): string {
        return this.response.statusText;
    }

    /**
     * Get the http response errors.
     * @returns {Array} Array of errors.
     */
    getBodyError(): string[] {
        let errors = [];

        if (this.response.error) {
            if (this.response.error.non_field_errors) {
                for (let err of this.response.error.non_field_errors) {
                    errors.push(err);
                }
            } else if (this.response.error) {
                if (typeof this.response.error === 'object') {
                    for (let [k, v] of Object.entries(this.response.error)) {
                        errors.push(v);
                    }
                } else {
                    errors.push(this.response.message);
                }

            } else {
                errors.push(this.response.statusText);
            }
        }

        return errors;
    }

    /**
     * Get response success.
     */
    isSuccess(): boolean {
        return this.success
    }

}
