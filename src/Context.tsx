import React from 'react';
import name from 'react-display-name';
import { AnyObject } from './util/typing';

export const YMapsContext = React.createContext<AnyObject | null>(null);

export const withYMapsContext = <TComponent extends React.ComponentType>(
  Component: TComponent
): TComponent => {
  const displayName = name(Component);

  const WithYMapsContext: React.FC = (props) => (
    <YMapsContext.Consumer>
      {(ymaps) => {
        if (ymaps === null) {
          const message =
            "Couldn't find Yandex.Maps API in the context. " +
            `Make sure that <${displayName} /> is inside <YMaps /> provider`;

          throw new Error(message);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <Component ymaps={ymaps} {...props} />;
      }}
    </YMapsContext.Consumer>
  );

  if (process.env.NODE_ENV !== 'production') {
    WithYMapsContext.displayName = `withYMapsContext(${displayName})`;
  }

  return WithYMapsContext as TComponent;
};

export const ParentContext = React.createContext(null);

export const withParentContext = <TComponent extends React.ComponentType>(
  Component: TComponent
): TComponent => {
  const WithParentContext: React.FC = (props) => (
    <ParentContext.Consumer>
      {(parent) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <Component parent={parent} {...props} />;
      }}
    </ParentContext.Consumer>
  );

  if (process.env.NODE_ENV !== 'production') {
    WithParentContext.displayName = `withParentContext(${name(Component)})`;
  }

  return WithParentContext as TComponent;
};
