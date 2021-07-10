export default class EntityAlreadyExist extends Error {
    constructor(className: string, entityId: string);
}
