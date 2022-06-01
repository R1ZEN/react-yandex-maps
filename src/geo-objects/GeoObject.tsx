import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseGeoObject } from './BaseGeoObject';
import { IDataManager, IGeometry, IOptionManager } from 'yandex-maps';

interface GeoObjectProps {
  /**
   * GeoObject [feature.geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject-docpage/#param-feature.geometry)
   */
  geometry?: IGeometry;
  /**
   * Uncontrolled GeoObject [feature.geometry](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject-docpage/#param-feature.geometry)
   */
  defaultGeometry?: IGeometry;
  /**
   * GeoObject [feature.properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject-docpage/#param-feature.properties)
   */
  properties?: IDataManager;
  /**
   * Uncontrolled GeoObject [feature.properties](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject-docpage/#param-feature.properties)
   */
  defaultProperties?: IDataManager;
  /**
   * GeoObject [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject-docpage/#param-options)
   */
  options?: IOptionManager;
  /**
   * Uncontrolled GeoObject [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject-docpage/#param-options)
   */
  defaultOptions?: IOptionManager;
}

const geoObjectDangerZoneProps = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  modifyConstructor(Constructor) {
    /**
     * The only difference between GeoObject and all the other,
     * more specific GeoObject constructors (like Placemark, Circle,
     * or Polyline) is the way in which the arguments are passed to
     * the constructor. GeoObject expects `feature` with `geometry` and
     * `properties` keys and all the other GeoObject constructors
     * expect `geometry` and `properties` as separate arguments
     *
     * We will hack around this difference with our custom constructor.
     * That way we can completely reuse GeoObject static methods.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function GeoObjectConstructor(geometry, properties, options) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Constructor.call(this, { geometry, properties }, options);
    }

    GeoObjectConstructor.prototype = Constructor.prototype;

    return GeoObjectConstructor;
  },
};

export const GeoObject = (props: GeoObjectProps) => {
  return (
    <BaseGeoObject
      {...props}
      name="GeoObject"
      dangerZone={geoObjectDangerZoneProps}
    />
  );
};

export default withParentContext(withYMaps(GeoObject, true, ['GeoObject']));
