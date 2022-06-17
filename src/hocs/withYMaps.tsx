import React, { useEffect } from 'react';
import { omit } from '../util/omit';
import { AnyObject, YMapsApi, YMapsModules } from '../util/typing';
import { ApiLoader } from '../util/create-api-loader';
import { useYMaps } from '../hooks/useYMaps';

export interface WithYMapsProps {
  modules?: YMapsModules;
  width?: string | number;
  height?: string | number;
  onLoad?: (api: YMapsApi) => void;
}

const defaultFunction = () => void 0;
const omitProps = ['onLoad', 'onError', 'modules', 'apiLoader'];

export default function withYMaps<TProps extends AnyObject>(
  Component: React.FC<TProps> | React.Component<TProps>,
  waitForApi = false,
  hocModules: YMapsModules = []
): React.FC<TProps> {
  const WithYMaps: React.FC<WithYMapsProps & { apiLoader: ApiLoader }> = (
    props
  ) => {
    const { width, height, modules = [], onLoad = defaultFunction } = props;
    const ymaps = useYMaps(hocModules.concat(modules));
    const shouldRender = !waitForApi || !!ymaps;
    const newProps = omit(props, omitProps);

    useEffect(() => (ymaps ? onLoad(ymaps) : void 0), [ymaps]);

    if (!shouldRender) {
      return <div style={{ width, height }} />;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component ymaps={ymaps} {...newProps} />;
  };

  return WithYMaps as unknown as React.FC<React.PropsWithChildren<TProps>>;
}
