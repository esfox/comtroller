"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comtroller = void 0;
class Comtroller {
    constructor(config) {
        this.config = config;
    }
    run(string, otherParams = {}) {
        var _a, _b;
        /* Get the string before the first white space, which is the command. */
        const firstSpace = string.indexOf(' ');
        let command = string.substr(0, firstSpace === -1 ? string.length : firstSpace);
        /* Find and run the corresponding command. */
        for (let { name, aliases = [], prefix, run } of this.config.commands) {
            let commandString = command;
            /* Get the parameters of the command. */
            const params = firstSpace === -1 ? '' : string.substr(firstSpace + 1);
            if (!prefix)
                prefix = (_a = this.config.defaults) === null || _a === void 0 ? void 0 : _a.prefix;
            /* Get the command string without the prefix. */
            if (prefix) {
                const prefixLength = prefix.length;
                const commandPrefixPart = command.substr(0, prefixLength);
                if (commandPrefixPart !== prefix)
                    continue;
                commandString = command.substr(prefixLength);
            }
            if (!((_b = this.config.defaults) === null || _b === void 0 ? void 0 : _b.caseSensitive))
                commandString = commandString.toLowerCase();
            if (commandString === name || aliases.includes(commandString)) {
                run(Object.assign({ params }, otherParams));
                break;
            }
        }
    }
}
exports.Comtroller = Comtroller;
