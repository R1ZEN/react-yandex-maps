import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseControl } from './BaseControl';
import { control } from 'yandex-maps';

interface RoutePanelProps {
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RoutePanel-docpage/#control.RoutePanel__param-parameters.options)
   */
  options?: control.IRouteButtonParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RoutePanel-docpage/#control.RoutePanel__param-parameters.options)
   */
  defaultOptions?: control.IRouteButtonParameters['options'];

  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RoutePanel-docpage/#control.RoutePanel__param-parameters.state)
   */
  state?: control.IRouteButtonParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RoutePanel-docpage/#control.RoutePanel__param-parameters.state)
   */
  defaultState?: control.IRouteButtonParameters['state'];
}

export const RoutePanel = (props: RoutePanelProps) => {
  return <BaseControl {...props} name="RoutePanel" />;
};

export default withParentContext(
  withYMaps(RoutePanel, true, [`control.RoutePanel`])
);
