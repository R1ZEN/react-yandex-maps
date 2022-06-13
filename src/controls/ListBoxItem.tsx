import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../hocs/withYMaps';

import { BaseControl } from './BaseControl';
import { control } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';
import { withErrorBoundary } from '../hocs/with-error-boundary';

interface ListBoxItemProps {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBoxItem-docpage/#control.ListBoxItem__param-parameters.data)
   */
  data?: control.IListBoxItemParameters['data'];
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBoxItem-docpage/#control.ListBoxItem__param-parameters.data)
   */
  defaultData?: control.IListBoxItemParameters['data'];
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBoxItem-docpage/#control.ListBoxItem__param-parameters.options)
   */
  options?: control.IListBoxItemParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBoxItem-docpage/#control.ListBoxItem__param-parameters.options)
   */
  defaultOptions?: control.IListBoxItemParameters['options'];
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBoxItem-docpage/#control.ListBoxItem__param-parameters.state)
   */
  state?: control.IListBoxItemParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBoxItem-docpage/#control.ListBoxItem__param-parameters.state)
   */
  defaultState?: control.IListBoxItemParameters['state'];
}

export const ListBoxItem: React.FC<
  React.PropsWithChildren<
    ListBoxItemProps & WithYMapsProps & WithInstanceRef & AnyObject
  >
> = (props) => {
  return <BaseControl {...props} name="ListBoxItem" />;
};

export default withErrorBoundary(
  withParentContext(
    withYMaps<ListBoxItemProps & WithYMapsProps & WithInstanceRef & AnyObject>(
      ListBoxItem,
      true,
      [`control.ListBoxItem`]
    )
  )
);
