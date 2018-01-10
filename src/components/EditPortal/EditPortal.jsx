import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Portal from './Portal.jsx';
import EditNote from '../EditNote/';
import { appModes } from '../../reducers/appMode';

import { noteStrings } from '../Note/';
import './EditPortal.scss';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  noteToEdit: PropTypes.object,
  noteCoords: PropTypes.object,
  element: PropTypes.string,
  focusPosition: PropTypes.number,
};

const defaultProps = {
  noteCoords: {}
};

const transitions = {
  WAITING: 'waiting',
  LOADING: 'loading',
  EXITING: 'exiting',
};

// @EVENT_HANDLING @PERFORMANCE -- for a description of this class, check the implementing a click on note animation devDiary.
class EditPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: transitions.WAITING,
    };
    this.container = null;
    this.handleClose = this.handleClose.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== appModes.EDIT && this.props.mode === appModes.EDIT) {
      setTimeout(() => {
        this.setState(() => ({ transition: transitions.LOADING }));
      }, 50);
    }
  }

  setContainerRef(node) {
    this.container = node;
  }

  handleClose() {
    this.setState(() => ({ transition: transitions.EXITING }));
  }

  handleTransitionEnd() {
    if (this.state.transition === transitions.EXITING) {
      this.props.onClose();
      this.setState(() => ({ transition: transitions.WAITING}));
    }
  }

  render() {
    let rootStyle, containerStyle;
    const editPortalClass = classNames({
      editPortal: true,
      position1: this.state.transition === transitions.LOADING,
      'editPortal editPortal--visible': this.props.mode === appModes.EDIT,
    });

    if (this.props.mode === appModes.EDIT) {
      rootStyle = {
        top: this.props.noteCoords.top,
        left: this.props.noteCoords.left,
      };
      containerStyle = {
        opacity: 0,
        height: this.props.noteCoords.height + 'px',
      };
    }

    return (
      <Portal>
        <div ref={this.setContainerRef} onTransitionEnd={this.handleTransitionEnd} className={editPortalClass}>
          {this.props.mode === appModes.EDIT ?
            <EditNote
              noteToEdit={this.props.noteToEdit}
              onClose={this.handleClose}
              onDone={this.props.onDone}
              rootStyle={rootStyle}
              containerStyle={containerStyle}
              autoSetHeight={this.state.transition === transitions.LOADING}
              focusTextBox={this.props.element === noteStrings.TEXTBOX}
              focusTitle={this.props.element === noteStrings.TITLE}
              focusPosition={this.props.focusPosition}
            />
            : ''
          }
        </div>
      </Portal>
    );
  }
}

EditPortal.propTypes = propTypes;
EditPortal.defaultProps = defaultProps;

export default EditPortal;
