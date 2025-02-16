// components/ErrorBoundary.tsx
import React from "react";

import styles from "$/components/ErrorBoundary/ErrorBoundary.module.css";
import { ERRORS } from "$/constants/strings.constants";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(ERRORS.boundary.message, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h1 className={styles.errorTitle}>{ERRORS.boundary.headerText}</h1>
          <pre className={styles.errorMessage}>{this.state.error?.message}</pre>
          <button
            onClick={() => this.setState({ hasError: false })}
            className={styles.retryButton}
          >
            {ERRORS.boundary.buttonText}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
