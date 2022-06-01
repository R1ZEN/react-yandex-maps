import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseGeoObject } from './BaseGeoObject';
import { IDataManager, IOptionManager, IPolygonGeometry } from 'yandex-maps';

interface PolygonProps {
  /**
   * Polygon [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-geometry)
   */
  geometry?: IPolygonGeometry;
  /**
   * Uncontrolled Polygon [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-geometry)
   */
  defaultGeometry?: IPolygonGeometry;
  /**
   * Polygon [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-properties)
   */
  properties?: IDataManager;
  /**
   * Uncontrolled Polygon [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-properties)
   */
  defaultProperties?: IDataManager;
  /**
   * Polygon [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-options)
   */
  options?: IOptionManager;
  /**
   * Uncontrolled Polygon [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-options)
   */
  defaultOptions?: IOptionManager;
}

export const Polygon = (props: PolygonProps) => {
  return <BaseGeoObject {...props} name="Polygon" />;
};

export default withParentContext(withYMaps(Polygon, true, ['Polygon']));
