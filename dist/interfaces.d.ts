export interface Command {
    name: string;
    aliases?: string[];
    prefix?: string;
    guards?: Guard[];
    run({ params, }: {
        params?: string;
        [key: string]: any;
    }): void;
}
export interface ComtrollerConfig {
    commands: Command[];
    defaults?: {
        prefix?: string;
        caseSensitive?: boolean;
    };
}
export declare type Guard = ({ params, }: {
    params?: string;
    [key: string]: any;
}) => boolean | Promise<boolean>;
