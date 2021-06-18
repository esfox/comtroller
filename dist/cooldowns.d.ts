export declare class Cooldowns {
    private dataFilePath;
    private datastore;
    private config;
    private cache;
    constructor(dataFilePath: string);
    add: (name: string, duration: number, persist?: boolean | undefined) => Promise<void>;
    check: (name: string, pendingKey: string) => Promise<boolean | number>;
    reset: (name: string) => Promise<void>;
    private checkCache;
    private checkDatastore;
}
