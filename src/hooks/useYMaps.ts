import ymaps from 'yandex-maps';
import { useEffect, useRef, useState } from 'react';
import { useYMapsApiLoader } from '../Context';

/**
 * Return loaded ymaps instance
 * @param modules
 */
export const useYMaps = (modules: string[] = []): typeof ymaps | null => {
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
