import { existsSync } from 'fs';
import nedb from 'nedb-promises';

export class Cooldowns
{
  private dataFilePath: string;
  private datastore: nedb | undefined;
  private config:
  {
    [name: string]:
    {
      duration: number;
      persist?: boolean;
    }
  };

  private cache:
  {
    [name: string]:
    {
      [key: string]: number;
    };
  };

  constructor(dataFilePath: string)
  {
    if(! dataFilePath)
      throw new Error('Please specify the file path for the cooldowns data file path.');

    this.dataFilePath = dataFilePath;
    this.config = {};
    this.cache = {};
  }

  add = async (name: string, duration: number, persist?: boolean) =>
  {
    this.config[name] =
    {
      duration,
      persist,
    };

    /* Only create the datastore if any cooldown is set to persist. */
    if(persist && ! this.datastore)
    {
      let created = existsSync(this.dataFilePath);
      this.datastore = new nedb(this.dataFilePath);
      if(! created)
        await this.datastore.ensureIndex({ fieldName: 'name', unique: true });
    }
  }

  check = async (name: string, pendingKey: string): Promise<boolean | number> =>
  {
    if(! name || ! pendingKey)
      return false;

    const cooldown = this.config[name];
    if(! cooldown)
      return false;

    const { persist, duration } = cooldown;
    return persist
      ? this.checkDatastore(name, pendingKey, duration)
      : this.checkCache(name, pendingKey, duration);
  }

  reset = async (name: string) =>
  {
    const cooldown = this.config[name];
    if(! cooldown)
      return;

    // const { persist } = cooldown;
    // if(persist)
    //   await this.datastore?.insert({ name: {} });
    // else
      this.cache[name] = {};
  }

  private checkCache = (name: string, pendingKey: string, duration: number) =>
  {
    const now = Date.now();
    const end = now + duration;

    if(! this.cache[name])
      this.cache[name] = {};

    if(! this.cache[name][pendingKey])
    {
      this.cache[name][pendingKey] = end;
      return false;
    }

    const cooldownEnd = this.cache[name][pendingKey] || 0;
    if(now < cooldownEnd)
      return cooldownEnd - now;

    this.cache[name][pendingKey] = end;
    return false;
  }

  private checkDatastore = async (name: string, pendingKey: string, duration: number) =>
  {
    if(! this.datastore)
      return false;

    const now = Date.now();
    const end = now + duration;

    const cooldown: any = await this.datastore.findOne({ name });
    if(! cooldown)
    {
      await this.datastore.insert({ name, pending: { [pendingKey]: end } });
      return false;
    }

    const cooldownEnd = cooldown.pending[pendingKey] || 0;
    if(now < cooldownEnd)
      return cooldownEnd - now;

    const update = { name, pending: { ...cooldown.pending, [pendingKey]: end } };
    await this.datastore.update({ name }, update);
    return false;
  }
}
