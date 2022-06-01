import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseGeoObject } from './BaseGeoObject';
import { IDataManager, IGeometry, IPlacemarkOptions } from 'yandex-maps';

interface PlacemarkProps {
  /**
   * Placemark [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-geometry)
   */
  geometry?: IGeometry;
  /**
   * Uncontrolled Placemark [geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-geometry)
   */
  defaultGeometry?: IGeometry;
  /**
   * Placemark [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-properties)
   */
  properties?: IDataManager;
  /**
   * Uncontrolled Placemark [properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-properties)
   */
  defaultProperties?: IDataManager;
  /**
   * Placemark [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-options)
   */
  options?: IPlacemarkOptions;
  /**
   * Uncontrolled Placemark [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#param-options)
   */
  defaultOptions?: IPlacemarkOptions;
}

export const Placemark = (props: PlacemarkProps) => {
  return <BaseGeoObject {...props} name="Placemark" />;
};

export default withParentContext(withYMaps(Placemark, true, ['Placemark']));
