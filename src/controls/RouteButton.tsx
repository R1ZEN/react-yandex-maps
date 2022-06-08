import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../withYMaps';

import { BaseControl, BaseControlProps } from './BaseControl';
import { control } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';

interface RouteButtonProps extends Omit<BaseControlProps, 'name'> {
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteButton-docpage/#control.RouteButton__param-parameters.options)
   */
  options?: control.IRouteButtonParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteButton-docpage/#control.RouteButton__param-parameters.options)
   */
  defaultOptions?: control.IRouteButtonParameters['options'];
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteButton-docpage/#control.RouteButton__param-parameters.state)
   */
  state?: control.IRouteButtonParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteButton-docpage/#control.RouteButton__param-parameters.state)
   */
  defaultState?: control.IRouteButtonParameters['state'];
}

export const RouteButton: React.FC<
  React.PropsWithChildren<
    RouteButtonProps & WithYMapsProps & WithInstanceRef & AnyObject
  >
> = (props) => {
  return <BaseControl {...props} name="RouteButton" />;
};

export default withParentContext(
  withYMaps<RouteButtonProps & WithYMapsProps & WithInstanceRef & AnyObject>(
    RouteButton,
    true,
    [`control.RouteButton`]
  )
);
