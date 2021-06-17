export interface Command {
    name: string;
    run(args: {
        params: string;
        [key: string]: string;
    }): void;
    prefix?: string;
}
export interface ComtrollerConfig {
    commands: Command[];
    defaults?: {
        prefix?: string;
    };
}
export declare class Comtroller {
    private config;
    constructor(config: ComtrollerConfig);
    run(string: string, otherParams?: {}): void;
}
