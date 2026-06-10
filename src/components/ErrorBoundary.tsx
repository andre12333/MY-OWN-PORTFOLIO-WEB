import { Component, type ReactNode } from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          color: "red",
          background: "#111",
          padding: "40px",
          margin: "40px auto",
          maxWidth: "600px",
          borderRadius: "8px",
          border: "1px solid red",
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}>
          <h2 style={{ color: "#ff6b35", marginBottom: "16px" }}>RENDER ERROR</h2>
          <p>{this.state.error?.message}</p>
          <p style={{ color: "#888", marginTop: "16px", fontSize: "12px" }}>
            {this.state.error?.stack?.split("\n").slice(0, 8).join("\n")}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
