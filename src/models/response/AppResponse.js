module.exports = class AppResponse {
  /**
     * @param {Number} code
     * @param {String} msg
     * @param { []} record
     */
    constructor(code, msg, records = []) {
        this.code = code
        this.msg = msg ;
        this.records = records;
    }
} 