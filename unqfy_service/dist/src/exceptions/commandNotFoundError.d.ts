export default class CommandNotFoundError extends Error {
    constructor(command: string);
}
