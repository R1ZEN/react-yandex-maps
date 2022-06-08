import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../withYMaps';

import { BaseControl, BaseControlProps } from './BaseControl';
import { control } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';

interface ListBoxProps extends Omit<BaseControlProps, 'name'> {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBox-docpage/#control.ListBox__param-parameters.data)
   */
  data?: control.IListBoxParameters['data'];
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBox-docpage/#control.ListBox__param-parameters.data)
   */
  defaultData?: control.IListBoxParameters['data'];

  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBox-docpage/#control.ListBox__param-parameters.options)
   */
  options?: control.IListBoxParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBox-docpage/#control.ListBox__param-parameters.options)
   */
  defaultOptions?: control.IListBoxParameters['options'];

  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBox-docpage/#control.ListBox__param-parameters.state)
   */
  state?: control.IListBoxParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.ListBox-docpage/#control.ListBox__param-parameters.state)
   */
  defaultState?: control.IListBoxParameters['state'];
}

export const ListBox: React.FC<
  React.PropsWithChildren<
    ListBoxProps & WithYMapsProps & WithInstanceRef & AnyObject
  >
> = (props) => {
  return <BaseControl {...props} name="ListBox" />;
};

export default withParentContext(
  withYMaps<ListBoxProps & WithYMapsProps & WithInstanceRef & AnyObject>(
    ListBox,
    true,
    [`control.ListBox`]
  )
);
