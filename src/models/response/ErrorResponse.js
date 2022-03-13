module.exports = class ErrorResponse {
  /**
     * @param {Number} code
     * @param {String} msg
     * @param { []} error
     */
    constructor(code, msg, error = []) {
        this.code = code
        this.msg = msg ;
        this.error = error;
    }
} 