import ymaps from 'yandex-maps';
import { set } from './set';
import { AnyObject, YMapsApi } from './typing';
import { isDevEnv } from './is-dev-env';
import { isBrowser } from './is-browser';

interface YMapsQuery {
  lang?: 'tr_TR' | 'en_US' | 'en_RU' | 'ru_RU' | 'ru_UA' | 'uk_UA';
  apikey?: string;
  coordorder?: 'latlong' | 'longlat';
  load?: string;
  mode?: 'release' | 'debug';
  csp?: boolean;
  ns?: string;
}

interface CreateYMapsLoaderOptions {
  version?: string;
  enterprise?: boolean;
  query?: YMapsQuery;
  preload?: boolean;
}

export type ApiLoader = ReturnType<typeof createApiLoader>;

const YMAPS_ONLOAD = '__yandex-maps-api-onload__';
const YMAPS_ONERROR = '__yandex-maps-api-onerror__';

const YMAPS_DEFAULT_QUERY: YMapsQuery = {
  lang: 'ru_RU',
  load: '',
  ns: '',
  mode: isDevEnv ? 'debug' : 'release',
};

const getBaseUrl = (isEnterprise?: boolean) =>
  `https://${isEnterprise ? 'enterprise.' : ''}api-maps.yandex.ru`;

const fetchScript = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.onload = resolve;
    script.onerror = reject;
    script.src = url;
    script.async = true;

    document.head.appendChild(script);
  });
};

export const createApiLoader = (options: CreateYMapsLoaderOptions) => {
  const { query = YMAPS_DEFAULT_QUERY } = options;
  const hash = Date.now().toString(32);
  const namespace = query.ns || '';
  const onload = YMAPS_ONLOAD + '$$' + hash;
  const onerror = YMAPS_ONERROR + '$$' + hash;
  const windowObj: Record<string, any> = isBrowser ? window : {};

  const PROMISES: Record<string, Promise<YMapsApi> | undefined> = {};
  let promise: Promise<YMapsApi> | undefined;
  let api: YMapsApi;

  const getApi = (): YMapsApi =>
    typeof window !== 'undefined' && namespace
      ? (window as unknown as Record<string, YMapsApi>)[namespace]
      : api;

  const setApi = (value: YMapsApi) => {
    api = value;

    return value;
  };

  const getPromise = () => {
    return namespace ? PROMISES[namespace] : promise;
  };

  const setPromise = (p?: Promise<YMapsApi>) => {
    promise = p;

    if (namespace) {
      PROMISES[namespace] = p;
    }

    return p;
  };

  const loadModule = (moduleName: string) => {
    return api.modules.require(moduleName).then((modules: AnyObject[]) => {
      modules.forEach((module) => {
        set(api, moduleName, module, true);
      });
    });
  };

  const load = () => {
    if (getApi()) {
      return Promise.resolve(setApi(getApi()));
    }

    if (getPromise()) {
      setPromise(getPromise());
    }

    const ymapsQuery: Record<string, string | boolean> = {
      onload,
      onerror,
      ...YMAPS_DEFAULT_QUERY,
      ...query,
    };

    const queryString = Object.keys(ymapsQuery)
      .map((key) => `${key}=${ymapsQuery[key]}`)
      .join('&');

    const baseUrl = getBaseUrl(options.enterprise);

    const url = [baseUrl, options.version, '?' + queryString].join('/');

    const p = new Promise<YMapsApi>((resolve, reject) => {
      windowObj[onload] = (ym: typeof ymaps) => {
        delete windowObj[onload];

        ym.ready(() => resolve(setApi(ym)));
      };

      windowObj[onerror] = (err: Error) => {
        delete windowObj[onerror];
        reject(err);
      };

      fetchScript(url).catch(windowObj[onerror]);
    });

    setPromise(p);

    return p;
  };

  return { load, getApi, loadModule };
};
