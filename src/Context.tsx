import React, { useContext } from 'react';
import { ApiLoader } from './util/create-api-loader';

export const YMapsApiLoaderContext = React.createContext<ApiLoader | null>(
  null
);

export const withYMapsContext = <
  TComponent extends React.ComponentType<React.PropsWithChildren<unknown>>
>(
  Component: TComponent
): TComponent => {
  const WithYMapsContext: React.FC<React.PropsWithChildren<unknown>> = (
    props
  ) => (
    <YMapsApiLoaderContext.Consumer>
      {(apiLoader) => {
        if (apiLoader === null) {
          const message =
            "Couldn't find Yandex.Maps API in the context. " +
            `Make sure that <${Component.displayName} /> is inside <YMaps /> provider`;

          throw new Error(message);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <Component apiLoader={apiLoader} {...props} />;
      }}
    </YMapsApiLoaderContext.Consumer>
  );

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

  return WithParentContext as TComponent;
};
