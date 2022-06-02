import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../withYMaps';

import { BaseControl, BaseControlProps } from './BaseControl';
import { control } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';

interface RulerControlProps extends Omit<BaseControlProps, 'name'> {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RulerControl-docpage/#control.RulerControl__param-parameters.data)
   */
  data?: control.IRulerControlParameters['data'];
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RulerControl-docpage/#control.RulerControl__param-parameters.data)
   */
  defaultData?: control.IRulerControlParameters['data'];
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RulerControl-docpage/#control.RulerControl__param-parameters.options)
   */
  options?: control.IRulerControlParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RulerControl-docpage/#control.RulerControl__param-parameters.options)
   */
  defaultOptions?: control.IRulerControlParameters['options'];
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RulerControl-docpage/#control.RulerControl__param-parameters.state)
   */
  state?: control.IRulerControlParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RulerControl-docpage/#control.RulerControl__param-parameters.state)
   */
  defaultState?: control.IRulerControlParameters['state'];
}

export const RulerControl: React.FC<
  RulerControlProps & WithYMapsProps & WithInstanceRef & AnyObject
> = (props) => {
  return <BaseControl {...props} name="RulerControl" />;
};

export default withParentContext(
  withYMaps<RulerControlProps & WithYMapsProps & WithInstanceRef & AnyObject>(
    RulerControl,
    true,
    [`control.RulerControl`]
  )
);
