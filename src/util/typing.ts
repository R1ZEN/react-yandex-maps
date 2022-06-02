export interface AnyObject {
  [key: string]: any;
}

export type AnyFunction = (...args: any[]) => any;

export interface WithInstanceRef {
  /** ref prop but for Yandex.Maps object instances */
  instanceRef?: ((value: any) => void) | { current: any };
}
