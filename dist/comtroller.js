"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comtroller = void 0;
var Comtroller = /** @class */ (function () {
    function Comtroller(config) {
        this.config = config;
    }
    Comtroller.prototype.run = function (string, otherParams) {
        var _a;
        if (otherParams === void 0) { otherParams = {}; }
        /* Get the string before the first white space, which is the command. */
        var firstSpace = string.indexOf(' ');
        var command = string.substr(0, firstSpace === -1 ? string.length : firstSpace);
        /* Find and run the corresponding command. */
        for (var _i = 0, _b = this.config.commands; _i < _b.length; _i++) {
            var _c = _b[_i], name_1 = _c.name, prefix = _c.prefix, run = _c.run;
            /* Get the parameters of the command. */
            var params = string.substr(firstSpace + 1);
            if (!prefix)
                prefix = (_a = this.config.defaults) === null || _a === void 0 ? void 0 : _a.prefix;
            /* Get the command string without the prefix. */
            if (prefix) {
                var prefixLength = prefix.length;
                var commandPrefixPart = command.substr(0, prefixLength);
                if (commandPrefixPart !== prefix)
                    continue;
                command = command.substr(prefixLength);
            }
            if (command === name_1) {
                run(__assign({ params: params }, otherParams));
                break;
            }
        }
    };
    return Comtroller;
}());
exports.Comtroller = Comtroller;
