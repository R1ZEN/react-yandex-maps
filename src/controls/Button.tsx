import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseControl } from './BaseControl';
import { data, IDataManager, IOptionManager } from 'yandex-maps';

interface ButtonProps {
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

export const Button = (props: ButtonProps) => {
  return <BaseControl {...props} name="Button" />;
};

export default withParentContext(withYMaps(Button, true, [`control.Button`]));
