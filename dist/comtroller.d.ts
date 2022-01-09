export interface Command {
    name: string;
    aliases?: string[];
    run(args: any): void;
    prefix?: string;
}
export interface ComtrollerConfig {
    commands: Command[];
    defaults?: {
        prefix?: string;
        caseSensitive?: boolean;
    };
}
export declare class Comtroller {
    private config;
    constructor(config: ComtrollerConfig);
    get(string: String): Command | undefined;
    run(string: string, otherParams?: {}): Command | undefined;
}
