import React from 'react';

import { withParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../hocs/withYMaps';

import { BaseControl, BaseControlProps } from './BaseControl';
import { data, IOptionManager } from 'yandex-maps';
import { AnyObject, WithInstanceRef } from '../util/typing';
import { withErrorBoundary } from '../hocs/with-error-boundary';

interface TypeSelectorProps extends Omit<BaseControlProps, 'name'> {
  /**
   * [Array of constructors for map types](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.TypeSelector-docpage/#control.TypeSelector__param-parameters.mapTypes) or keys. If the parameter is omitted, the item is added to the standard set of map types.
   */
  mapTypes?: 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid';
  /**
   * Uncontroled [array of constructors for map types](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.TypeSelector-docpage/#control.TypeSelector__param-parameters.mapTypes) or keys. If the parameter is omitted, the item is added to the standard set of map types.
   */
  defaultMapTypes?: 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid';
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.TypeSelector-docpage/#control.TypeSelector__param-parameters.options)
   */
  options?: IOptionManager;
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.TypeSelector-docpage/#control.TypeSelector__param-parameters.options)
   */
  defaultOptions?: IOptionManager;
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.TypeSelector-docpage/#control.TypeSelector__param-parameters.state)
   */
  state?: data.Manager;
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.TypeSelector-docpage/#control.TypeSelector__param-parameters.state)
   */
  defaultState?: data.Manager;
}

export const TypeSelector: React.FC<
  React.PropsWithChildren<
    TypeSelectorProps & WithYMapsProps & WithInstanceRef & AnyObject
  >
> = (props) => {
  return <BaseControl {...props} name="TypeSelector" />;
};

export default withErrorBoundary(
  withParentContext(
    withYMaps<TypeSelectorProps & WithYMapsProps & WithInstanceRef & AnyObject>(
      TypeSelector,
      true,
      [`control.TypeSelector`]
    )
  )
);
