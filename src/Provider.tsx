import React, { useEffect, useRef } from 'react';
import { YMapsContext } from './Context';
import { YMaps } from './YMaps';
import { AnyObject } from './util/typing';

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
    coordorder?: 'latlong' | 'longlat';
    load?: string;
    mode?: 'release' | 'debug';
    csp?: boolean;
    ns?: string;
  };
  children?: React.ReactNode;
  /**
   *  Allows provider to preload Yandex.Maps API even if
   *  there are no map components on the page
   */
  preload?: boolean;
}

export const Provider: React.FC<YMapProvider> = (props) => {
  const {
    version = '2.1',
    enterprise = false,
    query = { lang: 'ru_RU', load: '', ns: '' },
    preload = false,
    children,
  } = props;

  const ymapsRef = useRef<AnyObject>(
    new YMaps({ version, enterprise, query, preload })
  );

  useEffect(() => {
    if (preload) {
      ymapsRef.current.load();
    }
  }, []);

  return (
    <YMapsContext.Provider value={ymapsRef.current}>
      {children}
    </YMapsContext.Provider>
  );
};
