import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../hocs/withYMaps';

import { BaseControl, BaseControlProps } from './BaseControl';
import { control } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';
import { withErrorBoundary } from '../hocs/with-error-boundary';

interface RouteEditorProps extends Omit<BaseControlProps, 'name'> {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteEditor-docpage/#control.RouteEditor__param-parameters.data)
   */
  data?: control.IRouteEditorParameters['data'];
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteEditor-docpage/#control.RouteEditor__param-parameters.data)
   */
  defaultData?: control.IRouteEditorParameters['data'];
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteEditor-docpage/#control.RouteEditor__param-parameters.options)
   */
  options?: control.IRouteEditorParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteEditor-docpage/#control.RouteEditor__param-parameters.options)
   */
  defaultOptions?: control.IRouteEditorParameters['options'];
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteEditor-docpage/#control.RouteEditor__param-parameters.state)
   */
  state?: control.IRouteEditorParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.RouteEditor-docpage/#control.RouteEditor__param-parameters.state)
   */
  defaultState?: control.IRouteEditorParameters['state'];
}

export const RouteEditor: React.FC<
  React.PropsWithChildren<
    RouteEditorProps & WithYMapsProps & WithInstanceRef & AnyObject
  >
> = (props) => {
  return <BaseControl {...props} name="RouteEditor" />;
};

export default withErrorBoundary(
  withParentContext(
    withYMaps<RouteEditorProps & WithYMapsProps & WithInstanceRef & AnyObject>(
      RouteEditor,
      true,
      [`control.RouteEditor`]
    )
  )
);
