export default class BadParamError extends Error {
    constructor(param: string | string[]);
}
