import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../withYMaps';

import { BaseGeoObject, BaseGeoObjectProps } from './BaseGeoObject';
import { IDataManager, IGeometry, IOptionManager } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';

interface PolygonProps extends Omit<BaseGeoObjectProps, 'name'> {
  /**
   * Polygon [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-geometry)
   */
  geometry?: IGeometry[][][][] | number[][] | object;
  /**
   * Uncontrolled Polygon [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-geometry)
   */
  defaultGeometry?: IGeometry[][][][] | number[][] | object;
  /**
   * Polygon [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-properties)
   */
  properties?: AnyObject | IDataManager;
  /**
   * Uncontrolled Polygon [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-properties)
   */
  defaultProperties?: AnyObject | IDataManager;
  /**
   * Polygon [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-options)
   */
  options?: IOptionManager;
  /**
   * Uncontrolled Polygon [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/#param-options)
   */
  defaultOptions?: IOptionManager;
}

export const Polygon: React.FC<
  PolygonProps & WithYMapsProps & WithInstanceRef & AnyObject
> = (props) => {
  return <BaseGeoObject {...props} name="Polygon" />;
};

export default withParentContext(
  withYMaps<PolygonProps & WithYMapsProps & WithInstanceRef>(Polygon, true, [
    'Polygon',
  ])
);
