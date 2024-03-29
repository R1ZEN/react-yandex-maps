import React, { useEffect, useRef } from 'react';
import { YMapsApiLoaderContext } from './Context';
import { createApiLoader } from './util/create-api-loader';

interface YMapProvider {
  version?: string;
  enterprise?: boolean;
  /**
   *  Yandex.Maps API avaliable query params
   *  https://tech.yandex.com/maps/doc/jsapi/2.1/dg/concepts/load-docpage/
   *  Some query params will be omitted in any case because they are used
   *  by the library: onload, onerror
   */
  query?: {
    lang?: 'tr_TR' | 'en_US' | 'en_RU' | 'ru_RU' | 'ru_UA' | 'uk_UA';
    apikey?: string;
    suggest_apikey?: string;
    coordorder?: 'latlong' | 'longlat';
    load?: string;
    mode?: 'release' | 'debug';
    csp?: boolean;
    ns?: string;
  };
  /**
   *  Allows provider to preload Yandex.Maps API even if
   *  there are no map components on the page
   */
  preload?: boolean;
}

export const Provider: React.FC<React.PropsWithChildren<YMapProvider>> = (
  props
) => {
  const {
    version = '2.1',
    enterprise = false,
    query = { lang: 'ru_RU', load: '', ns: '' },
    preload = false,
    children,
  } = props;

  const ymapsRef = useRef(
    createApiLoader({ version, enterprise, query, preload })
  );

  useEffect(() => {
    if (preload) {
      ymapsRef.current.load();
    }
  }, [ymapsRef.current]);

  return (
    <YMapsApiLoaderContext.Provider value={ymapsRef.current}>
      {children}
    </YMapsApiLoaderContext.Provider>
  );
};
