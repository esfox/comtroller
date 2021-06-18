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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cooldowns = void 0;
const fs_1 = require("fs");
const nedb_promises_1 = __importDefault(require("nedb-promises"));
class Cooldowns {
    constructor(dataFilePath) {
        this.add = (name, duration, persist) => __awaiter(this, void 0, void 0, function* () {
            this.config[name] =
                {
                    duration,
                    persist,
                };
            /* Only create the datastore if any cooldown is set to persist. */
            if (persist && !this.datastore) {
                let created = fs_1.existsSync(this.dataFilePath);
                this.datastore = new nedb_promises_1.default(this.dataFilePath);
                if (!created)
                    yield this.datastore.ensureIndex({ fieldName: 'name', unique: true });
            }
        });
        this.check = (name, pendingKey) => __awaiter(this, void 0, void 0, function* () {
            if (!name || !pendingKey)
                return false;
            const cooldown = this.config[name];
            if (!cooldown)
                return false;
            const { persist, duration } = cooldown;
            return persist
                ? this.checkDatastore(name, pendingKey, duration)
                : this.checkCache(name, pendingKey, duration);
        });
        this.reset = (name) => __awaiter(this, void 0, void 0, function* () {
            const cooldown = this.config[name];
            if (!cooldown)
                return;
            // const { persist } = cooldown;
            // if(persist)
            //   await this.datastore?.insert({ name: {} });
            // else
            this.cache[name] = {};
        });
        this.checkCache = (name, pendingKey, duration) => {
            const now = Date.now();
            const end = now + duration;
            const pending = this.cache[name];
            if (pending) {
                this.cache[name] = { [pendingKey]: end };
                return false;
            }
            const cooldownEnd = pending[pendingKey] || 0;
            if (now < cooldownEnd)
                return cooldownEnd - now;
            this.cache[name][pendingKey] = end;
            return false;
        };
        this.checkDatastore = (name, pendingKey, duration) => __awaiter(this, void 0, void 0, function* () {
            if (!this.datastore)
                return false;
            const now = Date.now();
            const end = now + duration;
            const cooldown = yield this.datastore.findOne({ name });
            if (!cooldown) {
                yield this.datastore.insert({ name, pending: { [pendingKey]: end } });
                return false;
            }
            const cooldownEnd = cooldown.pending[pendingKey] || 0;
            if (now < cooldownEnd)
                return cooldownEnd - now;
            const update = { name, pending: Object.assign(Object.assign({}, cooldown.pending), { [pendingKey]: end }) };
            yield this.datastore.update({ name }, update);
            return false;
        });
        if (!dataFilePath)
            throw new Error('Please specify the file path for the cooldowns data file path.');
        this.dataFilePath = dataFilePath;
        this.config = {};
        this.cache = {};
    }
}
exports.Cooldowns = Cooldowns;
