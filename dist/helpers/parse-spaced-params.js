"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParamsToObject = exports.parseParamsToArray = void 0;
function parseParamsToArray(paramsString) {
    return !paramsString || paramsString === ''
        ? []
        : paramsString.trim().replace(/\s\s+/g, ' ').split(' ');
}
exports.parseParamsToArray = parseParamsToArray;
function parseParamsToObject(paramsString, keys = []) {
    const params = parseParamsToArray(paramsString);
    const paramsMap = {};
    for (const i in keys)
        paramsMap[keys[i]] = params[i];
    return paramsMap;
}
exports.parseParamsToObject = parseParamsToObject;
