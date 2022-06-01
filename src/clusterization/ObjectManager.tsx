// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';

import * as events from '../util/events';
import { getProp, isControlledProp } from '../util/props';
import { withParentContext } from '../Context';
import withYMaps from '../withYMaps';
import applyRef from '../util/ref';

export class ObjectManager extends React.Component {
  constructor() {
    super();
    this.state = { instance: null };
  }

  componentDidMount() {
    const instance = ObjectManager.mountObject(
      // eslint-disable-next-line react/prop-types
      this.props.ymaps.ObjectManager,
      this.props
    );

    this.setState({ instance });
  }

  componentDidUpdate(prevProps) {
    if (this.state.instance !== null) {
      ObjectManager.updateObject(this.state.instance, prevProps, this.props);
    }
  }

  componentWillUnmount() {
    ObjectManager.unmountObject(this.state.instance, this.props);
  }

  render() {
    return null;
  }

  static mountObject(ObjectManager, props) {
    const { instanceRef, parent, _events } = events.separateEvents(props);

    const options = getProp(props, 'options', {});
    const features = getProp(props, 'features', {});
    const filter = getProp(props, 'filter', null);
    const objects = getProp(props, 'objects', {});
    const clusters = getProp(props, 'clusters', {});

    const instance = new ObjectManager(options);

    instance.add(features || []);

    instance.setFilter(filter);

    instance.objects.options.set(objects);
    instance.clusters.options.set(clusters);

    Object.keys(_events).forEach((key) =>
      events.addEvent(instance, key, _events[key])
    );

    if (parent.geoObjects && typeof parent.geoObjects.add === 'function') {
      parent.geoObjects.add(instance);
    } else if (parent.add && typeof parent.add === 'function') {
      parent.add(instance);
    } else {
      throw new Error('No parent found to mount ObjectManager');
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

    if (isControlledProp(newProps, 'objects')) {
      const oldObjectsOptions = getProp(oldProps, 'objects');
      const newObjectsOptions = getProp(newProps, 'objects');

      if (oldObjectsOptions !== newObjectsOptions) {
        instance.objects.options.set(newObjectsOptions);
      }
    }

    if (isControlledProp(newProps, 'clusters')) {
      const oldClustersOptions = getProp(oldProps, 'clusters');
      const newClustersOptions = getProp(newProps, 'clusters');

      if (oldClustersOptions !== newClustersOptions) {
        instance.clusters.options.set(newClustersOptions);
      }
    }

    if (isControlledProp(newProps, 'filter')) {
      const oldFilter = getProp(oldProps, 'filter');
      const newFilter = getProp(newProps, 'filter');

      if (oldFilter !== newFilter) {
        instance.setFilter(newFilter);
      }
    }

    if (isControlledProp(newProps, 'features')) {
      const oldFeatures = getProp(oldProps, 'features');
      const newFeatures = getProp(newProps, 'features');

      if (oldFeatures !== newFeatures) {
        instance.remove(oldFeatures);
        instance.add(newFeatures);
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

export default withParentContext(
  withYMaps(ObjectManager, true, ['ObjectManager'])
);
