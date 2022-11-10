import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../hocs/withYMaps';

import { BaseControl, BaseControlProps } from './BaseControl';
import { control } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';
import {
  ErrorBoundaryProps,
  withErrorBoundary,
} from '../hocs/with-error-boundary';

interface RoutePanelProps extends Omit<BaseControlProps, 'name'> {
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RoutePanel-docpage/#control.RoutePanel__param-parameters.options)
   */
  options?: control.IRoutePanelParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RoutePanel-docpage/#control.RoutePanel__param-parameters.options)
   */
  defaultOptions?: control.IRoutePanelParameters['options'];

  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RoutePanel-docpage/#control.RoutePanel__param-parameters.state)
   */
  state?: control.IRoutePanelParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RoutePanel-docpage/#control.RoutePanel__param-parameters.state)
   */
  defaultState?: control.IRoutePanelParameters['state'];
}

export const RoutePanel: React.FC<
  React.PropsWithChildren<
    RoutePanelProps &
      WithYMapsProps &
      WithInstanceRef &
      ErrorBoundaryProps &
      AnyObject
  >
> = (props) => {
  return <BaseControl {...props} name="RoutePanel" />;
};

export default withErrorBoundary(
  withParentContext(withYMaps(RoutePanel, true, [`control.RoutePanel`]))
);
