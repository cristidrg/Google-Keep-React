import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Portal from './Portal.jsx';
import EditNote from '../EditNote/';
import { noteStrings } from '../Note/';
import { appModes } from '../../reducers/appMode';
import { Animate4Steps, animationStyle } from '../Animations/';
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

// @EVENT_HANDLING @PERFORMANCE -- for a description of this class, check the implementing a click on note animation devDiary.
class EditPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionPositionTop: 0,
      transitionPositionLeft: 0,
      transitionHeight: 0,
    };
    this.container = null;
    this.onDone = this.onDone.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setTransitionRef = this.setTransitionRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== appModes.EDIT && this.props.mode === appModes.EDIT) {
      const noteCoords = document.querySelector('.hide').getBoundingClientRect();
      this.setState(() => ({
        transitionPositionTop: noteCoords.top,
        transitionPositionLeft: noteCoords.left,
        transitionHeight: noteCoords.height,
      }));
      this.transition.initiateTransition();
    } else if (prevProps.mode === appModes.EDIT && this.props.mode !== appModes.EDIT) {
      this.transition.initiateExiting();
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

  setTransitionRef(node) {
    this.transition = node;
  }

  getTargetStyle() {
    return {
      rootStyle: {
        top: this.state.transitionPositionTop,
        left: this.state.transitionPositionLeft,
      },
      containerStyle: {
        opacity: 0,
        height: this.state.transitionHeight + 'px',
      },
    }
  }

  getInitialStyle() {
    return {
      rootStyle: {
        display: 'none',
      }
    }
  }

  render() {
    // How do we move this style to be handled transitionToCenter also?
    // Perhaps make an animation component which sets transition status to context
    // and then use a hoc for children to apply the styles from the context?
    // <Animation transitionToCenter> (styleApplier(<div>) styleApplier(<EditNote>)) </Animation>
    // This would leave to a lot of style props being passed around and will look uggly since the style
    // applier should have styles for each of the 4 states.
    const editPortalClass = classNames({
      editPortal: true, //I don't realy like getTransitionStatus()
      position1: this.transition.getTransitionStatus() === transitions.LOADING,
      'editPortal editPortal--visible': this.transition.getTransitionStatus() !== transitions.IDLE,
    });
     
    return (
      <Portal>
        <Animate4Steps ref={this.setTransitionRef} >
          <div className={editPortalClass}>
              <EditNote
                noteToEdit={this.props.noteToEdit}
                onClose={this.onClose}
                onDone={this.onDone}
                autoSetHeight={this.state.transition === transitions.LOADING}
                focusTextBox={this.props.focusedElement === noteStrings.TEXTBOX}
                focusTitle={this.props.focusedElement === noteStrings.TITLE}
                caretPosition={this.props.caretPosition}
              />
          </div>
        </Animate4Steps>
      </Portal>
    );
  }
}

EditPortal.propTypes = propTypes;
EditPortal.defaultProps = defaultProps;

export default EditPortal;
