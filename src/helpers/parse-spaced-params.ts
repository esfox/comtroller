export function parseSpacedParams(paramsString: string, keys: string[] = []): string[] | {} | void
{
  if(! paramsString)
    return;

  const params = paramsString.trim().replace(/\s\s+/g, ' ').split(' ');
  if(keys.length === 0)
    return params;

  const paramsMap: { [key: string]: string } = {};
  for(const i in keys)
    paramsMap[keys[i]] = params[i]

  return paramsMap;
}
