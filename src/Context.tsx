import React, { useContext } from 'react';
import name from 'react-display-name';
import { isDevEnv } from './util/is-dev-env';
import { ApiLoader } from './util/create-api-loader';

export const YMapsApiLoaderContext = React.createContext<ApiLoader | null>(
  null
);

export const withYMapsContext = <
  TComponent extends React.ComponentType<React.PropsWithChildren<unknown>>
>(
  Component: TComponent
): TComponent => {
  const displayName = name(Component);

  const WithYMapsContext: React.FC<React.PropsWithChildren<unknown>> = (
    props
  ) => (
    <YMapsApiLoaderContext.Consumer>
      {(apiLoader) => {
        if (apiLoader === null) {
          const message =
            "Couldn't find Yandex.Maps API in the context. " +
            `Make sure that <${displayName} /> is inside <YMaps /> provider`;

          throw new Error(message);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <Component apiLoader={apiLoader} {...props} />;
      }}
    </YMapsApiLoaderContext.Consumer>
  );

  if (isDevEnv) {
    WithYMapsContext.displayName = `withYMapsContext(${displayName})`;
  }

  return WithYMapsContext as TComponent;
};

export const useYMapsApiLoader = () => {
  const apiLoader = useContext(YMapsApiLoaderContext);
  if (apiLoader === null) {
    const message =
      "Couldn't find Yandex.Maps API in the context. " +
      `Make sure that hook useYMaps is inside <YMaps /> provider`;

    throw new Error(message);
  }

  return apiLoader;
};

export const ParentContext = React.createContext(null);

export const withParentContext = <
  TComponent extends React.ComponentType<React.PropsWithChildren<unknown>>
>(
  Component: TComponent
): TComponent => {
  const WithParentContext: React.FC<React.PropsWithChildren<unknown>> = (
    props
  ) => (
    <ParentContext.Consumer>
      {(parent) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <Component parent={parent} {...props} />;
      }}
    </ParentContext.Consumer>
  );

  if (isDevEnv) {
    WithParentContext.displayName = `withParentContext(${name(Component)})`;
  }

  return WithParentContext as TComponent;
};
