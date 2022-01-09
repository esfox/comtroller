export interface Command
{
  name: string;
  aliases?: string[];
  run(args: any): void;
  prefix?: string;
}

export interface ComtrollerConfig
{
  commands: Command[];
  defaults?:
  {
    prefix?: string;
    caseSensitive?: boolean;
  },
}

export class Comtroller
{
  private config: ComtrollerConfig;

  constructor(config: ComtrollerConfig)
  {
    this.config = config;
  }

  public get(string: String): Command | undefined
  {
    /* Get the string before the first white space, which is the command. */
    const [command] = string.split(/\s(.+)/g);

    /* Find and run the corresponding command. */
    for(let cmd of this.config.commands)
    {
      if(!cmd)
        continue;

      let { name, aliases = [], prefix } = cmd;
      let commandString = command;

      /* Get the parameters of the command. */
      if(!prefix)
        prefix = this.config.defaults?.prefix;

      /* Get the command string without the prefix. */
      if(prefix)
      {
        const prefixLength = prefix.length;
        if(command.substring(0, prefixLength) !== prefix)
          continue;

        commandString = command.substring(prefixLength);
      }

      if(!this.config.defaults?.caseSensitive)
        commandString = commandString.toLowerCase();

      if(commandString === name || aliases.includes(commandString))
        return cmd;
    }
  }

  public run(string: string, otherParams: {} = {}): Command | undefined
  {
    const command = this.get(string);
    if(!command)
      return;

    /* Get the string after the first white space of the string, which are the params. */
    const [, params] = string.split(/\s(.+)/g);
    command.run({ params, ...otherParams });
    return command;
  }
}
