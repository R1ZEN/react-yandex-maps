// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { ReactNode } from 'react';

import * as events from '../util/events';
import { getProp, isControlledProp } from '../util/props';
import { ParentContext } from '../Context';
import applyRef from '../util/ref';
import { AnyObject, WithInstanceRef } from '../util/typing';
import ymaps from 'yandex-maps';

export interface BaseControlProps {
  /** Parent object (e.g, ymaps.Map or ymaps.Clusterer) */
  parent?: AnyObject;

  /** Control name */
  name: Required<
    | 'Button'
    | 'FullscreenControl'
    | 'GeolocationControl'
    | 'ListBox'
    | 'ListBoxItem'
    | 'RouteButton'
    | 'RouteEditor'
    | 'RoutePanel'
    | 'RulerControl'
    | 'SearchControl'
    | 'TrafficControl'
    | 'TypeSelector'
    | 'ZoomControl'
  >;
}

export class BaseControl extends React.Component<
  BaseControlProps & WithInstanceRef
> {
  constructor() {
    super();
    this.state = { instance: null };
  }

  componentDidMount() {
    const instance = BaseControl.mountControl(
      this.props.ymaps.control[this.props.name],
      this.props
    );

    this.setState({ instance });
  }

  componentDidUpdate(prevProps) {
    if (this.state.instance !== null) {
      BaseControl.updateControl(this.state.instance, prevProps, this.props);
    }
  }

  componentWillUnmount() {
    BaseControl.unmountControl(this.state.instance, this.props);
  }

  render() {
    return (
      <ParentContext.Provider value={this.state.instance}>
        {this.props.children}
      </ParentContext.Provider>
    );
  }

  static mountControl(Control, props) {
    const { instanceRef, parent, lazy, _events } = events.separateEvents(props);

    const data = getProp(props, 'data');
    const options = getProp(props, 'options');
    const state = getProp(props, 'state');
    const mapTypes = getProp(props, 'mapTypes');

    const instance = new Control({ data, options, state, mapTypes, lazy });

    Object.keys(_events).forEach((key) =>
      events.addEvent(instance, key, _events[key])
    );

    if (
      parent &&
      parent.controls &&
      typeof parent.controls.add === 'function'
    ) {
      parent.controls.add(instance);
    } else if (parent && parent.add && typeof parent.add === 'function') {
      parent.add(instance);
    } else {
      throw new Error(`No parent found to mount ${props.name}`);
    }

    applyRef(null, instanceRef, instance);

    return instance;
  }

  static updateControl(instance, oldProps, newProps) {
    const { _events: newEvents, instanceRef } = events.separateEvents(newProps);
    const { _events: oldEvents, instanceRef: oldRef } =
      events.separateEvents(oldProps);

    if (isControlledProp(newProps, 'options')) {
      const oldOptions = getProp(oldProps, 'options');
      const newOptions = getProp(newProps, 'options');

      if (oldOptions !== newOptions) {
        instance.options.set(newOptions);
      }
    }

    if (isControlledProp(newProps, 'data')) {
      const oldData = getProp(oldProps, 'data');
      const newData = getProp(newProps, 'data');

      if (oldData !== newData) {
        instance.data.set(newData);
      }
    }

    if (isControlledProp(newProps, 'state')) {
      const oldState = getProp(oldProps, 'state');
      const newState = getProp(newProps, 'state');

      if (oldState !== newState) {
        instance.state.set(newState);
      }
    }

    if (isControlledProp(newProps, 'mapTypes')) {
      const oldMapTypes = getProp(oldProps, 'mapTypes');
      const newMapTypes = getProp(newProps, 'mapTypes');

      if (oldMapTypes !== newMapTypes) {
        instance.removeAllMapTypes();
        newMapTypes.forEach((type) => instance.addMapType(type));
      }
    }

    events.updateEvents(instance, oldEvents, newEvents);

    applyRef(oldRef, instanceRef, instance);
  }

  static unmountControl(instance, props) {
    const { instanceRef, parent, _events } = events.separateEvents(props);

    if (instance !== null) {
      Object.keys(_events).forEach((key) =>
        events.removeEvent(instance, key, _events[key])
      );

      if (parent.controls && typeof parent.controls.remove === 'function') {
        parent.controls.remove(instance);
      } else if (parent.remove && typeof parent.remove === 'function') {
        parent.remove(instance);
      }

      applyRef(instanceRef);
    }
  }
}
