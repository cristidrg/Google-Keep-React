import React, { Component } from 'react';

const transitions = {
  IDLE: 'idle',
  INITIATED: 'initiated',
  LOADING: 'loading',
  EXITING: 'exiting',
};

class Animate4Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: transitions.IDLE,
    };

    this.setToIdle = this.setToIdle.bind(this);
    this.initiateExiting = this.initiateExiting.bind(this);
    this.initiateTransition = this.initiateTransition.bind(this);
    this.getTransitionStatus = this.getTransitionStatus.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.appendStyleToChildren = this.appendStyleToChildren.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.state.transition === transitions.INITIATED) {
      setTimeout(() => {
        this.setState(() => ({ transition: transitions.LOADING }));
      }, 50);
    }
  }

  getChildContext() {
    return {animationStatus: this.state.transition};
  }

  initiateTransition() {
    this.setState(() => ({
      transition: transition.INITIATED,
    }));
  }

  initiateExiting() {
    this.setState(() => ({
      transition: transition.EXITING
    }));
  }

  getTransitionStatus() {
    return this.state.transition;
  }

  handleTransitionEnd() {
    if (this.state.transition === transitions.EXITING) {
      this.setState(() => ({ transition: transitions.IDLE }));
    }
  }

  appendStyleToChildren(style) {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...style,
        onTransitionEnd: this.handleTransitionEnd
      })
    })
  }

  render() {
    if (this.state.transition !== transitions.IDLE) {
      return this.appendStyleToChildren(this.props.targetStyle);
    } else {
      return this.appendStyleToChildren(this.props.initialStyle);
    }
  }
}

export { transitions, TransitionToCenter };
export default TransitionToCenter;