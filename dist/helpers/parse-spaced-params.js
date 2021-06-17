"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSpacedParams = void 0;
function parseSpacedParams(paramsString, keys) {
    if (keys === void 0) { keys = []; }
    if (!paramsString)
        return;
    var params = paramsString.trim().replace(/\s\s+/g, ' ').split(' ');
    if (keys.length === 0)
        return params;
    var paramsMap = {};
    for (var i in keys)
        paramsMap[keys[i]] = params[i];
    return paramsMap;
}
exports.parseSpacedParams = parseSpacedParams;
