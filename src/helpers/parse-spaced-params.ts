export function parseParamsToArray(paramsString: string): string[]
{
  return ! paramsString || paramsString === ''
    ? []
    : paramsString.trim().replace(/\s\s+/g, ' ').split(' ');
}

export function parseParamsToObject(paramsString: string, keys: string[] = []): {}
{
  const params = parseParamsToArray(paramsString);
  const paramsMap: { [key: string]: string } = {};
  for(const i in keys)
    paramsMap[keys[i]] = params[i]

  return paramsMap;
}
