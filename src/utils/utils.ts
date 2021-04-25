const UID = require('uuid/v4');

const generateId: (() => string) = () => UID();

module.exports = { generateId };
