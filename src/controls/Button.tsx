import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../withYMaps';

import { BaseControl, BaseControlProps } from './BaseControl';
import { data, IDataManager, IOptionManager } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';

interface ButtonProps extends Omit<BaseControlProps, 'name'> {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.Button-docpage/#control.Button__param-parameters.data)
   */
  data?: data.Manager;
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.Button-docpage/#control.Button__param-parameters.data)
   */
  defaultData?: data.Manager;
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.Button-docpage/#control.Button__param-parameters.options)
   */
  options?: IOptionManager;
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.Button-docpage/#control.Button__param-parameters.options)
   */
  defaultOptions?: IOptionManager;
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.Button-docpage/#control.Button__param-parameters.state)
   */
  state?: IDataManager;
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.Button-docpage/#control.Button__param-parameters.state)
   */
  defaultState?: IDataManager;
}

export const Button: React.FC<
  ButtonProps & WithYMapsProps & WithInstanceRef & AnyObject
> = (props) => {
  return <BaseControl {...props} name="Button" />;
};

export default withParentContext(
  withYMaps<ButtonProps & WithYMapsProps & WithInstanceRef & AnyObject>(
    Button,
    true,
    [`control.Button`]
  )
);
