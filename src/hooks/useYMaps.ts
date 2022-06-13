import { useEffect, useRef, useState } from 'react';
import { useYMapsApiLoader } from '../Context';
import { YMapsApi } from '../util/typing';

/**
 * Return loaded ymaps instance
 * @param modules
 * @param onError
 */
export const useYMaps = (modules: string[] = []): YMapsApi | null => {
  const [loaded, setLoaded] = useState(false);
  const modulesRef = useRef(modules);
  const apiLoader = useYMapsApiLoader();
  const api = apiLoader.getApi();

  useEffect(() => {
    apiLoader
      .load()
      .then(() => Promise.all(modulesRef.current.map(apiLoader.loadModule)))
      .then(() => setLoaded(true));
  }, []);

  return loaded && api ? api : null;
};
