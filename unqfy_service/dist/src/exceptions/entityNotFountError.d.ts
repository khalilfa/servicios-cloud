export default class EntityNotFoundError extends Error {
    constructor(className: string, entityId: string);
}
