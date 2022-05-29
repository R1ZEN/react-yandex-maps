import MockMapObject from './__mocks__/MockMapObject';

import { Map } from './Map';

describe('Map', () => {
  const parentElement = {};

  const baseProps = {
    onClick: jest.fn(),
    instanceRef: jest.fn(),
  };

  beforeEach(() => {
    baseProps.onClick.mockClear();
    baseProps.instanceRef.mockClear();
  });

  describe('mountObject', () => {
    it('should create an instance', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      expect(instance).toBeInstanceOf(MockMapObject);
    });

    it('should pass parentElement, state and options to the constructor', () => {
      const props = { ...baseProps, state: {}, options: {} };
      const instance = Map.mountObject(parentElement, MockMapObject, props);

      expect(instance.parentElement).toBe(parentElement);
      expect(instance.state).toBe(props.state);
      expect(instance.options.get()).toBe(props.options);
    });

    it('should pass defaultState and defaultOptions to constructor', () => {
      const props = { ...baseProps, defaultState: {}, defaultOptions: {} };
      const instance = Map.mountObject(parentElement, MockMapObject, props);

      expect(instance.state).toBe(props.defaultState);
      expect(instance.options.get()).toBe(props.defaultOptions);
    });

    it('should add events to the instance', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      expect(instance.events.add).toHaveBeenCalledWith(
        'click',
        baseProps.onClick
      );
    });

    it('should call instanceRef with an instance', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      expect(baseProps.instanceRef).toHaveBeenCalledWith(instance);
    });
  });

  describe('updateObject', () => {
    it('should update type when changed', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      const props = { ...baseProps, state: { type: 'new#type' } };

      Map.updateObject(instance, baseProps, props);

      expect(instance.setType).toHaveBeenCalledWith(props.state.type);
    });

    it('should update behaviors when changed', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      const props = { ...baseProps, state: { behaviors: ['zoom'] } };

      Map.updateObject(instance, baseProps, props);

      expect(instance.behaviors.enable).toHaveBeenCalledWith(
        props.state.behaviors
      );
    });

    it('should update zoom when changed', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      const props = { ...baseProps, state: { zoom: 9000 } };

      Map.updateObject(instance, baseProps, props);

      expect(instance.setZoom).toHaveBeenCalledWith(props.state.zoom);
    });

    it('should update center when changed', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      const props = { ...baseProps, state: { center: [0, 0] } };

      Map.updateObject(instance, baseProps, props);

      expect(instance.setCenter).toHaveBeenCalledWith(props.state.center);
    });

    it('should update bounds when changed', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      const props = {
        ...baseProps,
        state: {
          bounds: [
            [0, 0],
            [1, 1],
          ],
        },
      };

      Map.updateObject(instance, baseProps, props);

      expect(instance.setBounds).toHaveBeenCalledWith(props.state.bounds);
    });

    it('should update options when changed', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      const props = { ...baseProps, options: {} };

      Map.updateObject(instance, baseProps, props);

      expect(instance.options.set).toHaveBeenCalledWith(props.options);
    });

    it('should update events', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      const props = { ...baseProps, onClick: () => {} };

      Map.updateObject(instance, baseProps, props);

      expect(instance.events.remove).toHaveBeenCalledWith(
        'click',
        baseProps.onClick
      );
      expect(instance.events.add).toHaveBeenCalledWith('click', props.onClick);
    });

    it('should call instanceRef if changed', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      const props = { ...baseProps, instanceRef: jest.fn() };

      Map.updateObject(instance, baseProps, props);

      expect(baseProps.instanceRef).toHaveBeenCalledWith(null);
      expect(props.instanceRef).toHaveBeenCalledWith(instance);
    });
  });

  describe('unmountObject', () => {
    it('should remove events', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      Map.unmountObject(instance, baseProps);

      expect(instance.events.remove).toHaveBeenCalledWith(
        'click',
        baseProps.onClick
      );
    });

    it('should destroy instance', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      Map.unmountObject(instance, baseProps);

      expect(instance.destroy).toHaveBeenCalled();
    });

    it('should call instanceRef with null', () => {
      const instance = Map.mountObject(parentElement, MockMapObject, baseProps);
      Map.unmountObject(instance, baseProps);

      expect(baseProps.instanceRef).toHaveBeenCalledWith(null);
    });
  });
});
