import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseGeoObject } from './BaseGeoObject';
import { data, ICircleGeometry, option } from 'yandex-maps';

interface CircleProps {
  /**
   * Circle [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Circle-docpage/#param-geometry)
   */
  geometry?: ICircleGeometry;
  /**
   * Uncontrolled circle [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Circle-docpage/#param-geometry)
   */
  defaultGeometry?: ICircleGeometry;
  /**
   * Circle [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Circle-docpage/#param-properties)
   */
  properties?: data.Manager;
  /**
   * Uncontrolled circle [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Circle-docpage/#param-properties)
   */
  defaultProperties?: data.Manager;
  /**
   * Circle [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Circle-docpage/#param-options)
   */
  options?: option.Manager;
  /**
   * Uncontrolled circle [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Circle-docpage/#param-options)
   */
  defaultOptions?: option.Manager;
}

export const Circle = (props: CircleProps) => {
  return <BaseGeoObject {...props} name="Circle" />;
};

export default withParentContext(withYMaps(Circle, true, ['Circle']));
