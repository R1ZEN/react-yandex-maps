import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../hocs/withYMaps';

import { BaseGeoObject, BaseGeoObjectProps } from './BaseGeoObject';
import { IDataManager, IGeometry, IPlacemarkOptions } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';
import {
  ErrorBoundaryProps,
  withErrorBoundary,
} from '../hocs/with-error-boundary';

interface PlacemarkProps extends Omit<BaseGeoObjectProps, 'name'> {
  /**
   * Placemark [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-geometry)
   */
  geometry?: IGeometry[][][][] | number[][] | object;
  /**
   * Uncontrolled Placemark [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-geometry)
   */
  defaultGeometry?: IGeometry[][][][] | number[][] | object;
  /**
   * Placemark [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-properties)
   */
  properties?: AnyObject | IDataManager;
  /**
   * Uncontrolled Placemark [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-properties)
   */
  defaultProperties?: AnyObject | IDataManager;
  /**
   * Placemark [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-options)
   */
  options?: IPlacemarkOptions;
  /**
   * Uncontrolled Placemark [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-options)
   */
  defaultOptions?: IPlacemarkOptions;
}

export const Placemark: React.FC<
  React.PropsWithChildren<
    PlacemarkProps &
      WithYMapsProps &
      WithInstanceRef &
      ErrorBoundaryProps &
      AnyObject
  >
> = (props) => {
  return <BaseGeoObject {...props} name="Placemark" />;
};

export default withErrorBoundary(
  withParentContext(withYMaps(Placemark, true, ['Placemark']))
);
