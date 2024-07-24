import React from "react";

// Define the types for the props and state
interface ErrorBoundaryProps {
  fallback: React.ReactNode; // This will be the UI shown when an error occurs
  children: React.ReactNode; // This will be the children components
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Create the ErrorBoundary class component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Example of logging error to a service
    logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <>{this.props.fallback}</>;
    }

    return <>{this.props.children}</>;
  }
}

// Dummy function to illustrate error logging
function logErrorToMyService(error: Error, componentStack: string) {
  console.error("Logging error to service:", error, componentStack);
}

export default ErrorBoundary;
