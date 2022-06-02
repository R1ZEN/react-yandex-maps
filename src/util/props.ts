// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const defaultName = (name) =>
  'default' + name.charAt(0).toUpperCase() + name.slice(1);

/**
 * Checks if key exists on an object
 *
 * @param {Object} props Component props
 * @param {string} key Prop key
 * @returns {boolean} Check result
 */
export function isControlledProp(props, key) {
  return props[key] !== undefined || props[defaultName(key)] === undefined;
}

/**
 * Checks if prop exists, otherwise returns "uncontrolled"
 * prop that starts with default (e.g., defaultValue)
 *
 * @param {Object} props Component props
 * @param {string} key Prop key
 * @param {any} defaultValue
 * @return {any} Prop value
 */
export function getProp(props, key, defaultValue) {
  return (
    (isControlledProp(props, key) ? props[key] : props[defaultName(key)]) ||
    defaultValue
  );
}
