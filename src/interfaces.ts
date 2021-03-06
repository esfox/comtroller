export interface Command
{
  name: string;
  aliases?: string[];
  prefix?: string;
  guards?: Guard[],
  run({
    params,
  }: {
    params?: string,
    [key: string]: any,
  } | any): void;
}

export interface ComtrollerConfig
{
  commands: Command[];
  defaults?:
  {
    prefix?: string;
    caseSensitive?: boolean;
    guards?: Guard[];
  },
}

export type Guard = (
  { command, params }: { command?: Command, params?: string, [key: string]: any, } | any
) => boolean | Promise<boolean>;
