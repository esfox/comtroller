"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSpacedParams = void 0;
function parseSpacedParams(paramsString, keys = []) {
    if (!paramsString)
        return;
    const params = paramsString.trim().replace(/\s\s+/g, ' ').split(' ');
    if (keys.length === 0)
        return params;
    const paramsMap = {};
    for (const i in keys)
        paramsMap[keys[i]] = params[i];
    return paramsMap;
}
exports.parseSpacedParams = parseSpacedParams;
