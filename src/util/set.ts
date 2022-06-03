/**
 * Set value in object by path
 *
 * @param {Object} object Object to set value to
 * @param {string | string[]} path Path to value
 * @param {any} value Value
 * @param {boolean} [ifNotExists] Will skip setting value if value exists
 */
export const set = <TValue>(
  object: Record<string, any>,
  path: string | string[],
  value: TValue,
  ifNotExists = false
) => {
  const setPath = typeof path === 'string' ? path.split('.') : path.slice();

  let key: string;
  let ref = object;

  while (setPath.length > 1) {
    key = setPath.shift() as string;
    if (!ref[key]) ref[key] = {};
    ref = ref[key];
  }

  ref[setPath[0]] = ifNotExists === true ? ref[setPath[0]] || value : value;
  return object;
};
