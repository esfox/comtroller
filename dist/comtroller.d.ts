import { ComtrollerConfig, Command } from './interfaces';
export declare class Comtroller {
    private config;
    constructor(config: ComtrollerConfig);
    get(string: String): Command | undefined;
    run(string: string, otherParams?: {}): Promise<Command | undefined>;
}
