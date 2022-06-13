import React, { ErrorInfo } from 'react';
import { AnyObject } from '../util/typing';

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<unknown>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<unknown>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    return this.state.error ? null : this.props.children;
  }
}

/**
 * Prevent map tree crashing if components throw an error
 * @param Component
 */
export const withErrorBoundary = <TProps extends AnyObject>(
  Component: React.FC<TProps>
): React.FC<TProps> => {
  const WithErrorBoundary: React.FC<TProps> = (props) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

  return WithErrorBoundary;
};
