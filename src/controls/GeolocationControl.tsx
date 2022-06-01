import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseControl } from './BaseControl';
import { control } from 'yandex-maps';

interface GeolocationControlProps {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.GeolocationControl-docpage/#control.GeolocationControl__param-parameters.data)
   */
  data?: control.IGeolocationControlParameters['data'];
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.GeolocationControl-docpage/#control.GeolocationControl__param-parameters.data)
   */
  defaultData?: control.IGeolocationControlParameters['data'];
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.GeolocationControl-docpage/#control.GeolocationControl__param-parameters.options)
   */
  options?: control.IGeolocationControlParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.GeolocationControl-docpage/#control.GeolocationControl__param-parameters.options)
   */
  defaultOptions?: control.IGeolocationControlParameters['options'];
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.GeolocationControl-docpage/#control.GeolocationControl__param-parameters.state)
   */
  state?: control.IGeolocationControlParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.GeolocationControl-docpage/#control.GeolocationControl__param-parameters.state)
   */
  defaultState?: control.IGeolocationControlParameters['state'];
}

export const GeolocationControl = (props: GeolocationControlProps) => {
  return <BaseControl {...props} name="GeolocationControl" />;
};

export default withParentContext(
  withYMaps(GeolocationControl, true, [`control.GeolocationControl`])
);
