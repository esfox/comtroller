export interface Command
{
  name: string,
  run(args: {}): void,
  prefix?: string;
}

export interface ComtrollerConfig
{
  commands: Command[];
  defaults?:
  {
    prefix?: string,
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
    for(let { name, prefix, run } of this.config.commands)
    {
      /* Get the parameters of the command. */
      const params = string.substr(firstSpace + 1);

      if(! prefix)
        prefix = this.config.defaults?.prefix;

      /* Get the command string without the prefix. */
      if(prefix)
      {
        const prefixLength = prefix.length;
        const commandPrefixPart = command.substr(0, prefixLength);
        if(commandPrefixPart !== prefix)
          continue;

        command = command.substr(prefixLength);
      }

      if(command === name)
      {
        run({ params, ...otherParams });
        break;
      }
    }
  }
}
