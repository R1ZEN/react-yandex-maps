import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseGeoObject } from './BaseGeoObject';
import { IDataManager, IPolygonGeometry, IPolylineOptions } from 'yandex-maps';

interface PolylineProps {
  /**
   * Polyline [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-geometry)
   */
  geometry?: IPolygonGeometry;
  /**
   * Uncontrolled Polyline [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-geometry)
   */
  defaultGeometry?: IPolygonGeometry;
  /**
   * Polyline [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-properties)
   */
  properties?: IDataManager;
  /**
   * Uncontrolled Polyline [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-properties)
   */
  defaultProperties?: IDataManager;
  /**
   * Polyline [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-options)
   */
  options?: IPolylineOptions;
  /**
   * Uncontrolled Polyline [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-options)
   */
  defaultOptions?: IPolylineOptions;
}

export const Polyline = (props: PolylineProps) => {
  return <BaseGeoObject {...props} name="Polyline" />;
};

export default withParentContext(withYMaps(Polyline, true, ['Polyline']));
