import { set } from './set';
import { AnyObject, YMapsApi, YMapsModules } from './typing';
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
  const windowObj: AnyObject = isBrowser ? window : {};

  const PROMISES: Record<string, Promise<YMapsApi> | undefined> = {};
  let api: YMapsApi;

  const getApi = (): YMapsApi =>
    typeof isBrowser && namespace ? windowObj[namespace] : api;

  const loadModule = (moduleName: string): Promise<YMapsApi> => {
    return new Promise((res, rej) => {
      api.modules.require(moduleName).done((modules: YMapsModules[]) => {
        modules.forEach((module) => {
          set(api, moduleName, module, true);
        });

        res(api);
      }, rej);
    });
  };

  const clearWindow = () => {
    delete windowObj[onload];
    delete windowObj[onerror];
  };

  const load = (): Promise<YMapsApi> => {
    if (getApi()) {
      return Promise.resolve(api);
    }

    if (PROMISES[namespace]) {
      return PROMISES[namespace] as Promise<YMapsApi>;
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

    PROMISES[namespace] = new Promise<YMapsApi>((resolve, reject) => {
      windowObj[onload] = (ym: YMapsApi) => {
        clearWindow();

        void ym.ready(() => {
          api = ym;

          resolve(ym);
        });
      };

      windowObj[onerror] = (err: Error) => {
        clearWindow();
        reject(err);
      };

      fetchScript(url).catch(windowObj[onerror]);
    });

    return PROMISES[namespace] as Promise<YMapsApi>;
  };

  return { load, getApi, loadModule };
};
