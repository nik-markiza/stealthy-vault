import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type State = { hasError: boolean };
type Props = { children: ReactNode, onReset: () => void};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.log('ErrorBoundary caught an error:', error, info);
  }

  handleReset = () => {
    const { onReset } = this.props;
    this.setState({ hasError: false });
    onReset();
  };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Something went wrong</Text>
          <Button title="Retry" onPress={this.handleReset} />
        </View>
      );
    }
    return children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#70a1ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  errorText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 10,
    fontWeight: '600',
  },
});

export default ErrorBoundary;
