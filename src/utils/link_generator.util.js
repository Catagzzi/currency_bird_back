//import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require("uuid")

function getLink() {
    return uuidv4.v4();
}

module.exports = {
    getLink
}