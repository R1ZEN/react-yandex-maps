import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseControl } from './BaseControl';
import { control, data } from 'yandex-maps';

interface ZoomControlProps {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ZoomControl-docpage/#control.ZoomControl__param-parameters.data)
   */
  data?: data.Manager;
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ZoomControl-docpage/#control.ZoomControl__param-parameters.data)
   */
  defaultData?: data.Manager;
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ZoomControl-docpage/#control.ZoomControl__param-parameters.options)
   */
  options?: control.IZoomControlParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ZoomControl-docpage/#control.ZoomControl__param-parameters.options)
   */
  defaultOptions?: control.IZoomControlParameters['options'];

  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ZoomControl-docpage/#control.ZoomControl__param-parameters.state)
   */
  state?: data.Manager;
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ZoomControl-docpage/#control.ZoomControl__param-parameters.state)
   */
  defaultState?: data.Manager;
}

export const ZoomControl = (props: ZoomControlProps) => {
  return <BaseControl {...props} name="ZoomControl" />;
};

export default withParentContext(
  withYMaps(ZoomControl, true, [`control.ZoomControl`])
);
