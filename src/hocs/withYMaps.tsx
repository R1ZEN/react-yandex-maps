// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { omit } from '../util/omit';
import { withYMapsContext } from '../Context';
import ymaps from 'yandex-maps';
import { AnyObject } from '../util/typing';
import { ApiLoader } from '../util/create-api-loader';

export interface WithYMapsProps {
  modules?: string[];
  width?: string | number;
  height?: string | number;
  onLoad?: (api: typeof ymaps) => void;
  onError?: (err: Error) => void;
}

export default function withYMaps<TProps extends AnyObject>(
  Component: React.FC<TProps> | React.Component<TProps>,
  waitForApi = false,
  modules: string[] = []
): React.FC<React.PropsWithChildren<TProps>> {
  class WithYMaps extends React.Component<
    WithYMapsProps & { apiLoader: ApiLoader }
  > {
    constructor() {
      super();

      this.state = { loading: true };
      this._isMounted = false;
    }

    componentDidMount() {
      this._isMounted = true;

      this.props.apiLoader
        .load()
        .then((api) => {
          return Promise.all(
            modules
              .concat(this.props.modules)
              .map(this.props.apiLoader.loadModule)
          ).then(() => {
            if (this._isMounted === true) {
              this.setState({ loading: false }, () => {
                this.props.onLoad(api);
              });
            }
          });
        })
        .catch((err) => {
          if (this._isMounted === true) {
            this.props.onError(err);
          }
        });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      const { apiLoader, width, height } = this.props;
      const { loading } = this.state;

      const shouldRender = !waitForApi || loading === false;

      const props = omit(this.props, [
        'onLoad',
        'onError',
        'modules',
        'apiLoader',
      ]);

      if (!shouldRender) {
        return <div style={{ width, height }} />;
      }

      return <Component ymaps={apiLoader.getApi()} {...props} />;
    }
  }

  WithYMaps.defaultProps = {
    onLoad: Function.prototype,
    onError: Function.prototype,
    modules: [],
  };

  return withYMapsContext(WithYMaps);
}
