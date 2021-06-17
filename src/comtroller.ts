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
  },
}

export class Comtroller
{
  private config: ComtrollerConfig;

  constructor(config: ComtrollerConfig)
  {
    this.config = config;
  }

  public run(string: string, otherParams: {} = {}): void
  {
    /* Get the string before the first white space, which is the command. */
    const firstSpace = string.indexOf(' ');
    let command = string.substr(0, firstSpace === -1 ? string.length : firstSpace);

    /* Find and run the corresponding command. */
    for(let { name, aliases = [], prefix, run } of this.config.commands)
    {
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

      if(commandString === name || aliases.includes(commandString))
      {
        run({ params, ...otherParams });
        break;
      }
    }
  }
}
