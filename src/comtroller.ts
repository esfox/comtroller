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

  public run(string: string, otherParams: {} = {}): Command | undefined
  {
    /* Get the string before the first white space, which is the command. */
    const firstSpace = string.indexOf(' ');
    let command = string.substr(0, firstSpace === -1 ? string.length : firstSpace);

    /* Find and run the corresponding command. */
    for(let cmd of this.config.commands)
    {
      if(! cmd)
        continue;

      let { name, aliases = [], prefix, run } = cmd
      let commandString = command;

      /* Get the parameters of the command. */
      const params = firstSpace === -1 ? '' : string.substr(firstSpace + 1);

      if(! prefix)
        prefix = this.config.defaults?.prefix;

      /* Get the command string without the prefix. */
      if(prefix)
      {
        const prefixLength = prefix.length;
        const commandPrefixPart = command.substr(0, prefixLength);
        if(commandPrefixPart !== prefix)
          continue;

        commandString = command.substr(prefixLength);
      }

      if(! this.config.defaults?.caseSensitive)
        commandString = commandString.toLowerCase();

      if(commandString === name || aliases.includes(commandString))
      {
        run({ params, ...otherParams });
        return cmd;
      }
    }

    return;
  }
}
