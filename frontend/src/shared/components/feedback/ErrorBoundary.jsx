import { Component } from "react";
import { ErrorState } from "./ErrorState";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState message="A rendering error occurred in this section." />;
    }

    return this.props.children;
  }
}

