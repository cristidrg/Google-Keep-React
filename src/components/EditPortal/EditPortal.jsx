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
  focusedElement: PropTypes.string,
  caretPosition: PropTypes.number,
};

const defaultProps = {
  noteToEdit: {
    title: '',
    note: '',
    selected: false, 
    pinned: false,
  },
};

const transitions = {
  IDLE: 'idle',
  INITIATED: 'initiated',
  LOADING: 'loading',
  EXITING: 'exiting',
};

// @EVENT_HANDLING @PERFORMANCE -- for a description of this class, check the implementing a click on note animation devDiary.
class EditPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transition: transitions.IDLE,
      transitionPositionTop: 0,
      transitionPositionLeft: 0,
      transitionHeight: 0,
    };
    this.container = null;
    this.onDone = this.onDone.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== appModes.EDIT && this.props.mode === appModes.EDIT) {
      const noteCoords = document.querySelector('.hide').getBoundingClientRect();
      this.setState(() => ({
        transitionPositionTop: noteCoords.top,
        transitionPositionLeft: noteCoords.left,
        transitionX: noteCoords.x,
        transitionY: noteCoords.y,
        transitionHeight: noteCoords.height,
        transition: transitions.INITIATED,
      }));
    } else if (this.state.transition === transitions.INITIATED) {
      setTimeout(() => {
        this.setState(() => ({ transition: transitions.LOADING }));
      }, 50);
    } else if (prevProps.mode === appModes.EDIT && this.props.mode !== appModes.EDIT) {
      this.setState(() => ({
        transition: transitions.EXITING,
      }));
    }
  }

  onClose() {
    if (this.props.mode === appModes.EDIT) {
      this.props.onClose();
    }
  }

  onDone(noteAttribs) {
    if (this.props.mode === appModes.EDIT) {
      this.props.onDone(noteAttribs);
    }
  }

  setContainerRef(node) {
    this.container = node;
  }

  handleTransitionEnd() {
    if (this.state.transition === transitions.EXITING) {
      this.setState(() => ({ transition: transitions.IDLE }));
    }
  }

  render() {
    const editPortalClass = classNames({
      editPortal: true,
      'editPortal--visible': this.state.transition !== transitions.IDLE,
    });
    
    const rootStyle = {
      top: this.state.transition !== transitions.IDLE ? this.state.transitionPositionTop : 'auto',
      left: this.state.transition !== transitions.IDLE ? this.state.transitionPositionLeft : 'auto',
      width: this.state.transition === transitions.LOADING ? '600px' : '300px',
      transform: this.state.transition === transitions.LOADING ? 
      `translate(${document.body.clientWidth / 2 - 300 - this.state.transitionX}px,
        ${document.body.clientHeight / 2 - this.state.transitionY}px)`
      : '',
      display: this.state.transition === transitions.IDLE ? 'none' : 'block',
    }

    const containerStyle = {
      opacity: this.state.transition === transitions.LOADING ? 0 : 1,
      height: this.state.transition !== transitions.IDLE ? this.state.transitionHeight + 'px' : 0,
    }

    return (
      <Portal>
        <div ref={this.setContainerRef} onTransitionEnd={this.handleTransitionEnd} className={editPortalClass}>
          <EditNote
            noteToEdit={this.props.noteToEdit}
            onClose={this.onClose}
            onDone={this.onDone}
            rootStyle={rootStyle}
            containerStyle={containerStyle}
            autoSetHeight={this.state.transition === transitions.LOADING}
            focusTextBox={this.props.focusedElement === noteStrings.TEXTBOX}
            focusTitle={this.props.focusedElement === noteStrings.TITLE}
            caretPosition={this.props.caretPosition}
          />
        </div>
      </Portal>
    );
  }
}

EditPortal.propTypes = propTypes;
EditPortal.defaultProps = defaultProps;

export default EditPortal;
