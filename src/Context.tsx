// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import name from 'react-display-name';

export const YMapsContext = React.createContext(null);

export const withYMapsContext = (Component) => {
  const displayName = name(Component);

  const WithYMapsContext = (props) => (
    <YMapsContext.Consumer>
      {(ymaps) => {
        if (ymaps === null) {
          const message =
            "Couldn't find Yandex.Maps API in the context. " +
            `Make sure that <${displayName} /> is inside <YMaps /> provider`;

          throw new Error(message);
        }
        return <Component ymaps={ymaps} {...props} />;
      }}
    </YMapsContext.Consumer>
  );

  if (process.env.NODE_ENV !== 'production') {
    WithYMapsContext.displayName = `withYMapsContext(${displayName})`;
  }

  return WithYMapsContext;
};

export const ParentContext = React.createContext(null);

export const withParentContext = (Component) => {
  const WithParentContext = (props) => (
    <ParentContext.Consumer>
      {(parent) => <Component parent={parent} {...props} />}
    </ParentContext.Consumer>
  );

  if (process.env.NODE_ENV !== 'production') {
    WithParentContext.displayName = `withParentContext(${name(Component)})`;
  }

  return WithParentContext;
};
