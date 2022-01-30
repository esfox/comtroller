"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comtroller = void 0;
class Comtroller {
    constructor(config) {
        this.config = config;
    }
    get(string) {
        var _a, _b;
        /* Get the string before the first white space, which is the command. */
        const [command] = string.split(/\s(.+)/g);
        /* Find and run the corresponding command. */
        for (let cmd of this.config.commands) {
            if (!cmd)
                continue;
            let { name, aliases = [], prefix } = cmd;
            let commandString = command;
            /* Get the parameters of the command. */
            if (!prefix)
                prefix = (_a = this.config.defaults) === null || _a === void 0 ? void 0 : _a.prefix;
            /* Get the command string without the prefix. */
            if (prefix) {
                const prefixLength = prefix.length;
                if (command.substring(0, prefixLength) !== prefix)
                    continue;
                commandString = command.substring(prefixLength);
            }
            if (!((_b = this.config.defaults) === null || _b === void 0 ? void 0 : _b.caseSensitive))
                commandString = commandString.toLowerCase();
            if (commandString === name || aliases.includes(commandString))
                return cmd;
        }
    }
    run(string, otherParams = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.get(string);
            if (!command)
                return;
            /* Get the string after the first white space of the string, which are the params. */
            const [, params] = string.split(/\s(.+)/g);
            /* Combine the default and command's guards. */
            const defaultGuards = ((_a = this.config.defaults) === null || _a === void 0 ? void 0 : _a.guards) || [];
            const commandGuards = command.guards || [];
            const guards = defaultGuards.concat(commandGuards);
            /* Run the guards. */
            for (const guard of guards) {
                const isGuarded = yield guard({ params });
                if (isGuarded)
                    return;
            }
            command.run(Object.assign({ params }, otherParams));
            return command;
        });
    }
}
exports.Comtroller = Comtroller;
