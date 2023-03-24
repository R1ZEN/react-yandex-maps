/**
 * Set value in object by path
 *
 * @param {Object} object Object to set value to
 * @param {string | string[]} path Path to value
 * @param {any} value Value
 * @param {boolean} [ifNotExists] Will skip setting value if value exists
 */
export const set = <TValue>(
  object: Record<string, unknown>,
  path: string | string[],
  value: TValue,
  ifNotExists = false
) => {
  const setPath = typeof path === 'string' ? path.split('.') : path.slice();

  let key: string;
  let ref = object;

  while (setPath.length > 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    key = setPath.shift()!;
    if (!ref[key]) ref[key] = {};
    ref = ref[key] as Record<string, unknown>;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const lastPathKey = setPath[0]!;

  ref[lastPathKey] = ifNotExists === true ? ref[lastPathKey] || value : value;
  return object;
};
