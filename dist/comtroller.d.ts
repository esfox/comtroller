interface Command {
    name: string;
    run(args: {}): void;
    prefix?: string;
}
interface ComtrollerConfig {
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
export {};
