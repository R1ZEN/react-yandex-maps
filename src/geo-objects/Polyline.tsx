import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../hocs/withYMaps';

import { BaseGeoObject, BaseGeoObjectProps } from './BaseGeoObject';
import { IDataManager, IPolygonGeometry, IPolylineOptions } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';
import { withErrorBoundary } from '../hocs/with-error-boundary';

interface PolylineProps extends Omit<BaseGeoObjectProps, 'name'> {
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
  properties?: AnyObject | IDataManager;
  /**
   * Uncontrolled Polyline [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-properties)
   */
  defaultProperties?: AnyObject | IDataManager;
  /**
   * Polyline [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-options)
   */
  options?: IPolylineOptions;
  /**
   * Uncontrolled Polyline [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/#param-options)
   */
  defaultOptions?: IPolylineOptions;
}

export const Polyline: React.FC<
  React.PropsWithChildren<
    PolylineProps & WithYMapsProps & WithInstanceRef & AnyObject
  >
> = (props) => {
  return <BaseGeoObject {...props} name="Polyline" />;
};

export default withErrorBoundary(
  withParentContext(
    withYMaps<PolylineProps & WithYMapsProps & WithInstanceRef>(
      Polyline,
      true,
      ['Polyline']
    )
  )
);
