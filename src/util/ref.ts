// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Mimics React ref behavior. First cleans oldRef, if possible, then applies new ref value
 * https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
 *
 * @param {Object<{current: T}> | Function} oldRef
 * @param {Object<{current: T}> | Function?} newRef
 * @param {T?} value
 */
export default function applyRef(oldRef, newRef, value = null) {
  if (oldRef !== newRef) {
    if (oldRef) {
      if ('current' in oldRef) {
        oldRef.current = null;
      } else if (typeof oldRef === 'function') {
        oldRef(null);
      }
    }

    if (!newRef) return;

    if ('current' in newRef) {
      newRef.current = value;
    } else if (typeof newRef === 'function') {
      newRef(value);
    }
  }
}
