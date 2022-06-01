import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseGeoObject } from './BaseGeoObject';
import {
  IDataManager,
  IOptionManager,
  IPixelRectangleGeometry,
} from 'yandex-maps';

interface RectangleProps {
  /**
   * Rectangle [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Rectangle-docpage/#param-geometry)
   */
  geometry?: IPixelRectangleGeometry;
  /**
   * Uncontrolled Rectangle [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Rectangle-docpage/#param-geometry)
   */
  defaultGeometry?: IPixelRectangleGeometry;
  /**
   * Rectangle [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Rectangle-docpage/#param-properties)
   */
  properties?: IDataManager;
  /**
   * Uncontrolled Rectangle [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Rectangle-docpage/#param-properties)
   */
  defaultProperties?: IDataManager;
  /**
   * Rectangle [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Rectangle-docpage/#param-options)
   */
  options?: IOptionManager;
  /**
   * Uncontrolled Rectangle [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Rectangle-docpage/#param-options)
   */
  defaultOptions?: IOptionManager;
}

export const Rectangle = (props: RectangleProps) => {
  return <BaseGeoObject {...props} name="Rectangle" />;
};

export default withParentContext(withYMaps(Rectangle, true, ['Rectangle']));
