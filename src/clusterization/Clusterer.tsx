// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { ReactNode } from 'react';

import * as events from '../util/events';
import { getProp, isControlledProp } from '../util/props';
import { withParentContext, ParentContext } from '../Context';
import withYMaps, { WithYMapsProps } from '../hocs/withYMaps';
import applyRef from '../util/ref';
import { IClustererOptions } from 'yandex-maps';
import { AnyFunction, AnyObject, WithInstanceRef } from '../util/typing';
import {
  ErrorBoundaryProps,
  withErrorBoundary,
} from '../hocs/with-error-boundary';

interface ClusterProps {
  /** Clusterer [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Clusterer-docpage/) */
  options?: IClustererOptions;
  /** Uncontrolled Clusterer [options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Clusterer-docpage/) */
  defaultOptions?: IClustererOptions;

  instanceRef?: AnyFunction;

  ymaps?: typeof ymaps;

  parent?: AnyObject;

  children?: ReactNode;
}

export class Clusterer extends React.Component<
  ClusterProps &
    WithYMapsProps &
    WithInstanceRef &
    ErrorBoundaryProps &
    AnyObject
> {
  constructor() {
    super();
    this.state = { instance: null };
    this.instance = null;
  }

  componentDidMount() {
    const instance = Clusterer.mountObject(
      // eslint-disable-next-line react/prop-types
      this.props.ymaps.Clusterer,
      this.props
    );

    this.instance = instance;
    this.setState({ instance });
  }

  componentDidUpdate(prevProps) {
    if (this.state.instance !== null) {
      Clusterer.updateObject(this.instance, prevProps, this.props);
    }
  }

  componentWillUnmount() {
    Clusterer.unmountObject(this.instance, this.props);
  }

  render() {
    return (
      <ParentContext.Provider value={this.state.instance}>
        {this.props.children}
      </ParentContext.Provider>
    );
  }

  static mountObject(Clusterer, props) {
    const { instanceRef, parent, _events } = events.separateEvents(props);

    const options = getProp(props, 'options');

    const instance = new Clusterer(options);

    Object.keys(_events).forEach((key) =>
      events.addEvent(instance, key, _events[key])
    );

    if (parent.geoObjects && typeof parent.geoObjects.add === 'function') {
      parent.geoObjects.add(instance);
    } else if (parent.add && typeof parent.add === 'function') {
      parent.add(instance);
    } else {
      throw new Error('No parent found to mount Clusterer');
    }

    applyRef(null, instanceRef, instance);

    return instance;
  }

  static updateObject(instance, oldProps, newProps) {
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

    events.updateEvents(instance, oldEvents, newEvents);

    applyRef(oldRef, instanceRef, instance);
  }

  static unmountObject(instance, props) {
    const { instanceRef, parent, _events } = events.separateEvents(props);

    if (instance !== null) {
      Object.keys(_events).forEach((key) =>
        events.removeEvent(instance, key, _events[key])
      );

      if (parent.geoObjects && typeof parent.geoObjects.remove === 'function') {
        parent.geoObjects.remove(instance);
      } else if (parent.remove && typeof parent.remove === 'function') {
        parent.remove(instance);
      }

      applyRef(instanceRef);
    }
  }
}

export default withErrorBoundary(
  withParentContext(withYMaps(Clusterer, true, ['Clusterer']))
);
