import React from 'react';

import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';

import { BaseControl } from './BaseControl';
import { control } from 'yandex-maps';

interface SearchControlProps {
  /**
   * Control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.SearchControl-docpage/#control.SearchControl__param-parameters.data)
   */
  data?: control.ISearchControlParameters['data'];
  /**
   * Uncontrolled control [data](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.SearchControl-docpage/#control.SearchControl__param-parameters.data)
   */
  defaultData?: control.ISearchControlParameters['data'];
  /**
   * Control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.SearchControl-docpage/#control.SearchControl__param-parameters.options)
   */
  options?: control.ISearchControlParameters['options'];
  /**
   * Uncontrolled control [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.SearchControl-docpage/#control.SearchControl__param-parameters.options)
   */
  defaultOptions?: control.ISearchControlParameters['options'];
  /**
   * Control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.SearchControl-docpage/#control.SearchControl__param-parameters.state)
   */
  state?: control.ISearchControlParameters['state'];
  /**
   * Uncontrolled control [state](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/control.SearchControl-docpage/#control.SearchControl__param-parameters.state)
   */
  defaultState?: control.ISearchControlParameters['state'];
}

export const SearchControl = (props: SearchControlProps) => {
  return <BaseControl {...props} name="SearchControl" />;
};

export default withParentContext(
  withYMaps(SearchControl, true, [`control.SearchControl`])
);
