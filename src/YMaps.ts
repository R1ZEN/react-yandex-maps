// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { set } from './util/set';
import ymaps from 'yandex-maps';

const YMAPS_ONLOAD = '__yandex-maps-api-onload__';

const YMAPS_ONERROR = '__yandex-maps-api-onerror__';

function getBaseUrl(isEnterprise: string) {
  return `https://${isEnterprise ? 'enterprise.' : ''}api-maps.yandex.ru`;
}

const YMAPS_DEFAULT_QUERY = {
  lang: 'ru_RU',
  load: '',
  ns: '',
  mode: process.env.NODE_ENV !== 'production' ? 'debug' : 'release',
};

const PROMISES = {};

export class YMaps {
  options: any;
  namespace: string;

  onload: string;
  onerror: string;

  api?: typeof ymaps;
  promise?: Promise<any>;
  script?: HTMLScriptElement;

  constructor(options) {
    const hash = Date.now().toString(32);

    this.options = options;
    this.namespace = options.query.ns || YMAPS_DEFAULT_QUERY.ns;

    this.onload = YMAPS_ONLOAD + '$$' + hash;
    this.onerror = YMAPS_ONERROR + '$$' + hash;
  }

  getApi(): typeof ymaps {
    return typeof window !== 'undefined' && this.namespace
      ? window[this.namespace]
      : this.api;
  }

  setApi(api: typeof ymaps) {
    return (this.api = api);
  }

  getPromise() {
    return this.namespace ? PROMISES[this.namespace] : this.promise;
  }

  setPromise(promise: Promise<any>) {
    return this.namespace
      ? (PROMISES[this.namespace] = this.promise = promise)
      : (this.promise = promise);
  }

  load() {
    if (this.getApi()) return Promise.resolve(this.setApi(this.getApi()));
    if (this.getPromise()) return this.setPromise(this.getPromise());

    const query = Object.assign(
      {
        onload: this.onload,
        onerror: this.onerror,
      },
      YMAPS_DEFAULT_QUERY,
      this.options.query
    );

    const queryString = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');

    const baseUrl = getBaseUrl(this.options.enterprise);

    const url = [baseUrl, this.options.version, '?' + queryString].join('/');

    const promise = new Promise((resolve, reject) => {
      window[this.onload] = (ymaps) => {
        delete window[this.onload];
        ymaps.loadModule = this.loadModule.bind(this);
        ymaps.ready(() => resolve(this.setApi(ymaps)));
      };

      window[this.onerror] = (err: Error) => {
        delete window[this.onerror];
        reject(err);
      };

      this.fetchScript(url).catch(window[this.onerror]);
    });

    return this.setPromise(promise);
  }

  fetchScript(url: string) {
    return new Promise((resolve, reject) => {
      this.script = document.createElement('script');

      this.script.type = 'text/javascript';
      this.script.onload = resolve;
      this.script.onerror = reject;
      this.script.src = url;
      this.script.async = true;

      document.head.appendChild(this.script);
    });
  }

  loadModule(moduleName: string) {
    return new Promise((resolve, reject) => {
      this.getApi().modules.require(
        moduleName,
        (Module) => {
          set(this.api as typeof ymaps, moduleName, Module, true);
          resolve(Module);
        },
        reject,
        this.getApi()
      );
    });
  }
}
