import React, {Component, ReactNode} from "react";

interface OutsideClickHandlerProps {
  onClickOutside: Function,
  onFocusOutside?: Function,
  children: ReactNode
  className?: string,
  component?: string
  render?: Function
}
interface OutsideClickHandlerState {

}

export default class OutsideClickHandler extends Component<OutsideClickHandlerProps, OutsideClickHandlerState> {

  clickCaptured = false;
  focusCaptured = false;

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.flush();
  }

  render() {
    const render = this.props.render || this.props.children;

    if (typeof render === "function") {
      return render(this.getProps());
    }

    return this.renderComponent();
  }

  renderComponent() {
    return React.createElement(this.props.component || "div", this.getProps(), this.props.children);
  }

  getProps() {
    return {
      className: this.props.className,
      onMouseDown: this.innerClick,
      onFocus: this.innerFocus,
      onTouchStart: this.innerClick
    };
  }

  init() {
    document.addEventListener("mousedown", this.documentClick);
    document.addEventListener("focusin", this.documentFocus);
    document.addEventListener("touchstart", this.documentClick);
  }

  flush() {
    document.removeEventListener("mousedown", this.documentClick);
    document.removeEventListener("focusin", this.documentFocus);
    document.removeEventListener("touchstart", this.documentClick);
  }


  documentClick = (event) => {
    if (!this.clickCaptured && this.props.onClickOutside) {
      this.props.onClickOutside(event);
    }
    this.clickCaptured = false;
  };

  innerClick = () => {
    this.clickCaptured = true;
  };

  documentFocus = (event) => {
    if (!this.focusCaptured && this.props.onFocusOutside) {
      this.props.onFocusOutside(event);
    }
    this.focusCaptured = false;
  };

  innerFocus = () => {
    this.focusCaptured = true;
  };
}
