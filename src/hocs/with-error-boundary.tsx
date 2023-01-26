import React, { ErrorInfo } from 'react';
import { AnyObject } from '../util/typing';

export interface ErrorBoundaryProps {
  onError?: (err: Error) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError = () => void 0 } = this.props;

    onError(error);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  override render() {
    return this.state.error ? null : this.props.children;
  }
}

/**
 * Prevent map tree crashing if components throw an error
 * @param Component
 */
export const withErrorBoundary = <TProps extends AnyObject>(
  Component: React.FC<React.PropsWithChildren<TProps>>
): React.FC<React.PropsWithChildren<TProps & ErrorBoundaryProps>> => {
  const WithErrorBoundary: React.FC<TProps & ErrorBoundaryProps> = ({
    onError,
    ...props
  }) => {
    return (
      <ErrorBoundary onError={onError}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  return WithErrorBoundary;
};
