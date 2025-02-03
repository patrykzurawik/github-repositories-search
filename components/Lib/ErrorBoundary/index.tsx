'use client';

import React from 'react';
import { MdError } from 'react-icons/md';

import ButtonSecondary from 'components/Lib/Button/Secondary';

import styles from './ErrorBounday.module.scss';

type TErrorBoundaryProps = {
  message: string;
  cta: string;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<TErrorBoundaryProps, State> {
  constructor (props: TErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError (error: unknown) {
    console.error('Caught error:', error);
    return { hasError: true };
  }

  componentDidCatch (error: unknown, errorInfo: React.ErrorInfo) {
    console.error('Error details:', error, errorInfo);
  }

  render () {
    if (this.state.hasError) {
      return <div
        role='alert'
        aria-live='assertive'
        className={styles.ErrorBoundary}
      >
        <span className={styles.Title}>
          <MdError />
          {this.props.message}
        </span>

        <ButtonSecondary onClick={() => document.location.reload()}>
          { this.props.cta }
        </ButtonSecondary>
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;