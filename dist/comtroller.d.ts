declare type ComtrollerConfig = {
    commands: {
        name: string;
        run(args?: {
            params?: string;
            [key: string]: any;
        }): void;
        prefix?: string;
    }[];
    defaults?: {
        prefix?: string;
    };
};
export declare class Comtroller {
    private config;
    constructor(config: ComtrollerConfig);
    run(string: string, otherParams?: {}): void;
}
export {};
