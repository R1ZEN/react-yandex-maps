import ymaps from 'yandex-maps';
import { MutableRefObject } from 'react';

export type YMapsApi = typeof ymaps;

export interface AnyObject {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type AnyFunction = (...args: unknown[]) => unknown;

export interface WithInstanceRef {
  /** ref prop but for Yandex.Maps object instances */
  instanceRef?:
    | ((value: ymaps.Map) => void)
    | MutableRefObject<ymaps.Map | undefined>;
}

export type YMapsModules = string[];
