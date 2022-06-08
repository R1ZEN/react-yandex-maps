import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../withYMaps';

import { BaseControl, BaseControlProps } from './BaseControl';
import { control, IDataManager } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';

interface FullscreenControlProps extends Omit<BaseControlProps, 'name'> {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.FullscreenControl-docpage/#control.FullscreenControl__param-parameters.data)
   */
  data?: control.IFullscreenControlParameters['data'];
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.FullscreenControl-docpage/#control.FullscreenControl__param-parameters.data)
   */
  defaultData?: control.IFullscreenControlParameters['data'];
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.FullscreenControl-docpage/#control.FullscreenControl__param-parameters.options)
   */
  options?: control.IFullscreenControlParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.FullscreenControl-docpage/#control.FullscreenControl__param-parameters.options)
   */
  defaultOptions?: control.IFullscreenControlParameters['options'];
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.FullscreenControl-docpage/#control.FullscreenControl__param-parameters.state)
   */
  state?: IDataManager;
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.FullscreenControl-docpage/#control.FullscreenControl__param-parameters.state)
   */
  defaultState?: IDataManager;
}

export const FullscreenControl: React.FC<
  React.PropsWithChildren<
    FullscreenControlProps & WithYMapsProps & WithInstanceRef & AnyObject
  >
> = (props) => {
  return <BaseControl {...props} name="FullscreenControl" />;
};

export default withParentContext(
  withYMaps<
    FullscreenControlProps & WithYMapsProps & WithInstanceRef & AnyObject
  >(FullscreenControl, true, [`control.FullscreenControl`])
);
