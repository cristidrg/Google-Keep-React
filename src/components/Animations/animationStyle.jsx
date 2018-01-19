import React, { Component } from 'react';

import { transitions } from './TransitionToCenter.jsx';

const animationStyle = (Component) => {
  return class AnimatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.getClassNames = this.getClassNames.bind(this);
    }

    getClassNames() {
      let style = this.props.persistentStyle;
      return {
        ...style,
        ...this.props.style[this.context.animationStatus]
      }
    }

    render() {
      return (
        <Component {...this.getClassNames()}/>
      );
    }
  }
}

export default animationStyle;