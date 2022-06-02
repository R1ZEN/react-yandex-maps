// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { CSSProperties } from 'react';
import * as events from './util/events';
import { omit } from './util/omit';
import { getProp, isControlledProp } from './util/props';
import withYMaps, { WithYMapsProps } from './withYMaps';
import { ParentContext } from './Context';
import applyRef from './util/ref';
import getParentElementSize from './util/getParentElementSize';
import ymaps from 'yandex-maps';
import { AnyObject, WithInstanceRef } from './util/typing';

interface MapProps {
  /**
   * [Map state parameters](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Map-docpage/#param-state)
   */
  state?: ymaps.IMapState;
  /**
   * Uncontrolled [Map state parameters](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Map-docpage/#param-state)
   */
  defaultState?: ymaps.IMapState;

  /**
   * [Map options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Map-docpage/#Map__param-options)
   */
  options?: ymaps.IMapOptions;
  /**
   * Uncontrolled [Map options](https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Map-docpage/#Map__param-options)
   */
  defaultOptions?: ymaps.IMapOptions;

  /**
   * Yandex.Maps Map parent element should have at least
   * some size set to it, otherwise the map is rendered
   * into the container with size 0
   *
   * To avoid this we will use `width` and `height` props as default
   * way of sizing the map element, but then if we see that
   * the library user also provides `style` or `className` prop,
   * we will assume that the Map is sized by those and will
   * not use these
   */

  /**
   * Map container width
   */
  width?: string | number;

  /**
   * Map container height
   */
  height?: string | number;

  /**
   * Map container style
   */
  style?: CSSProperties;

  /**
   * Map container className
   */
  className?: string;
}

export class Map extends React.Component<
  MapProps & WithYMapsProps & WithInstanceRef
> {
  constructor() {
    super();
    this.instance = null;
    this.state = { instance: null };
    this._parentElement = null;
    this._getRef = (ref) => {
      this._parentElement = ref;
    };
  }

  componentDidMount() {
    this.instance = Map.mountObject(
      this._parentElement,
      // eslint-disable-next-line react/prop-types
      this.props.ymaps.Map,
      this.props
    );

    this.setState({ instance: this.instance });
  }

  componentDidUpdate(prevProps) {
    if (this.instance !== null) {
      Map.updateObject(this.instance, prevProps, this.props);
    }
  }

  componentWillUnmount() {
    Map.unmountObject(this.instance, this.props);
  }

  render() {
    const parentElementStyle = getParentElementSize(this.props);
    const separatedProps = events.separateEvents(this.props);

    const parentElementProps = omit(separatedProps, [
      '_events',
      'state',
      'defaultState',
      'options',
      'defaultOptions',
      'instanceRef',
      'ymaps',
      'children',
      'width',
      'height',
      'style',
      'className',
    ]);

    return (
      <ParentContext.Provider value={this.state.instance}>
        <div ref={this._getRef} {...parentElementStyle} {...parentElementProps}>
          {this.props.children}
        </div>
      </ParentContext.Provider>
    );
  }

  static mountObject(parentElement, Map, props) {
    const { instanceRef, _events } = events.separateEvents(props);

    const state = getProp(props, 'state');
    const options = getProp(props, 'options');

    const instance = new Map(parentElement, state, options);

    Object.keys(_events).forEach((key) =>
      events.addEvent(instance, key, _events[key])
    );

    applyRef(null, instanceRef, instance);

    return instance;
  }

  static updateObject(instance, oldProps, newProps) {
    const { _events: newEvents, instanceRef } = events.separateEvents(newProps);
    const { _events: oldEvents, instanceRef: oldRef } =
      events.separateEvents(oldProps);

    if (isControlledProp(newProps, 'state')) {
      const oldState = getProp(oldProps, 'state', {});
      const newState = getProp(newProps, 'state', {});

      if (oldState.type !== newState.type) {
        instance.setType(newState.type);
      }

      if (oldState.behaviors !== newState.behaviors) {
        if (oldState.behaviors) instance.behaviors.disable(oldState.behaviors);
        if (newState.behaviors) instance.behaviors.enable(newState.behaviors);
      }

      if (newState.zoom && oldState.zoom !== newState.zoom) {
        instance.setZoom(newState.zoom);
      }

      if (newState.center && oldState.center !== newState.center) {
        instance.setCenter(newState.center);
      }

      if (newState.bounds && oldState.bounds !== newState.bounds) {
        instance.setBounds(newState.bounds);
      }
    }

    if (isControlledProp(newProps, 'options')) {
      const oldOptions = getProp(oldProps, 'options');
      const newOptions = getProp(newProps, 'options', {});

      if (oldOptions !== newOptions) {
        instance.options.set(newOptions);
      }
    }

    if (
      getProp(oldProps, 'width') !== getProp(newProps, 'width') ||
      getProp(oldProps, 'height') !== getProp(newProps, 'height')
    ) {
      instance.container.fitToViewport();
    }

    events.updateEvents(instance, oldEvents, newEvents);

    applyRef(oldRef, instanceRef, instance);
  }

  static unmountObject(instance, props) {
    const { instanceRef, _events } = events.separateEvents(props);

    if (instance !== null) {
      Object.keys(_events).forEach((key) =>
        events.removeEvent(instance, key, _events[key])
      );

      instance.destroy();

      // Clean used ref
      applyRef(instanceRef);
    }
  }
}

const YMapsMap = withYMaps<
  MapProps & WithYMapsProps & WithInstanceRef & AnyObject
>(Map, true, ['Map']);

YMapsMap.defaultProps = {
  width: 320,
  height: 240,
};

export default YMapsMap;
