import { Component } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onError: () => void;
};

type State = { hasError: boolean };

export class PlayerErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return <p className="uploader-error">このアニメーションを再生できませんでした</p>;
    }
    return this.props.children;
  }
}
