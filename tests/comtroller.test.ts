import { Comtroller } from '../src';
import { Command } from '../src/interfaces';

const commands: Command[] = [
  {
    name: 'simple',
    run: () => console.log('simple'),
  },
  {
    name: 'params',
    run: ({ params }) => console.log(params)
  },
  {
    name: 'extra-params',
    run: ({ extraParams }) => console.log(extraParams)
  },
  {
    name: 'guarded',
    guards: [({ params }) => params === 'guard'],
    run: () => console.log('should not be run if the params is "guard"'),
  }
];

const comtroller = new Comtroller({
  commands,
  defaults:
  {
    prefix: '!',
    guards: [({ params }) => params === 'no-run'],
  },
});

test('should run the "simple" command', async () =>
{
  console.log = jest.fn();

  const commandString = 'simple';
  const commandRan = await comtroller.run(`!${commandString}`);
  if(!commandRan)
    fail('Command was not run');

  expect(console.log).toHaveBeenCalledWith(commandString);
  expect(commandRan.name).toBe(commandString);
  expect(commandRan.run).toBeDefined();
});

test('should run the "params" command with params', async () =>
{
  console.log = jest.fn();

  const commandString = 'params';
  const paramsString = 'parameters';
  const commandRan = await comtroller.run(`!${commandString} ${paramsString}`);
  if(!commandRan)
    fail('Command was not run');

  expect(console.log).toHaveBeenLastCalledWith(paramsString);
  expect(commandRan.name).toBe(commandString);
  expect(commandRan.run).toBeDefined();
});

test('should run the "extra-params" command with extra parameters', async () =>
{
  console.log = jest.fn();

  const commandString = 'extra-params';
  const extraParams = 'extra parameters';
  const commandRan = await comtroller.run(`!${commandString}`, { extraParams });
  if(!commandRan)
    fail('Command was not run');

  expect(console.log).toHaveBeenLastCalledWith(extraParams);
  expect(commandRan.name).toBe(commandString);
  expect(commandRan.run).toBeDefined();
});

test('should successfully run the "guarded" command guard and not run it', async () =>
{
  const commandString = 'guarded';
  const commandRan = await comtroller.run(`!${commandString} guard`);
  expect(commandRan).toBeUndefined();
});

test('should successfully run the default guard for all commands and not run any command', async () =>
{
  for(const command of commands)
  {
    const commandRan = await comtroller.run(`!${command.name} no-run`);
    expect(commandRan).toBeUndefined();
  }
});
