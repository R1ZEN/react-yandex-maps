// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { ReactNode } from 'react';
import { omit } from './util/omit';
import { withYMapsContext } from './Context';
import ymaps from 'yandex-maps';

interface WithYMapsProps {
  ymaps?: ymaps;
  modules?: string[];
  width?: string | number;
  height?: string | number;
  onLoad?: (api: ymaps) => void;
  onError?: (err: Error) => void;
}

export default function withYMaps(
  Component: ReactNode,
  waitForApi = false,
  modules: string[] = []
) {
  class WithYMaps extends React.Component<WithYMapsProps> {
    constructor() {
      super();

      this.state = { loading: true };
      this._isMounted = false;
    }

    componentDidMount() {
      this._isMounted = true;

      this.props.ymaps
        .load()
        .then((api) => {
          return Promise.all(
            modules.concat(this.props.modules).map(api.loadModule)
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
      const { ymaps, width, height } = this.props;
      const { loading } = this.state;

      const shouldRender = waitForApi === false || loading === false;

      const props = omit(this.props, ['onLoad', 'onError', 'modules', 'ymaps']);

      if (!shouldRender) {
        return <div style={{ width, height }} />;
      }

      return <Component ymaps={ymaps.getApi()} {...props} />;
    }
  }

  WithYMaps.defaultProps = {
    onLoad: Function.prototype,
    onError: Function.prototype,
    modules: [],
  };

  return withYMapsContext(WithYMaps);
}
