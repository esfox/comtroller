"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comtroller = void 0;
class Comtroller {
    constructor(config) {
        this.config = config;
    }
    run(string, otherParams = {}) {
        var _a, _b;
        /* Get the string before the first white space, which is the command,
          and the rest of the string, which are the params. */
        const [command, params = ''] = string.split(/\s(.+)/g);
        /* Find and run the corresponding command. */
        for (let cmd of this.config.commands) {
            if (!cmd)
                continue;
            let { name, aliases = [], prefix, run } = cmd;
            let commandString = command;
            /* Get the parameters of the command. */
            if (!prefix)
                prefix = (_a = this.config.defaults) === null || _a === void 0 ? void 0 : _a.prefix;
            /* Get the command string without the prefix. */
            if (prefix) {
                const prefixLength = prefix.length;
                if (command.substr(0, prefixLength) !== prefix)
                    continue;
                commandString = command.substr(prefixLength);
            }
            if (!((_b = this.config.defaults) === null || _b === void 0 ? void 0 : _b.caseSensitive))
                commandString = commandString.toLowerCase();
            if (commandString === name || aliases.includes(commandString)) {
                run(Object.assign({ params }, otherParams));
                return cmd;
            }
        }
        return;
    }
}
exports.Comtroller = Comtroller;
