import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditNote from '../EditNote';
import strings from '../../strings';
import { defaultNoteState } from '../../reducers/notes';

/**
 * @REACT_BP -- REACT_COMPONENT_DESIGN
 * This component favors composition making use of EditNote to achieve
 * the take a note functionality which is present at the top of the page.
 *
 * Initially I wanted to have a single component for both edit and take a note,
 * however it turned out too ugly. A benefit for doing that is that the VDOM would
 * always have the same component mounted. Currently, this component either mounts
 * the raw html or the EditNote. Thus, when state change occurs, the children
 * are always mounted/unmounted. It would be better to have both components present
 * and hide them via display:none, but it is an improvement which is not necessary.
 *
 */
class TakeNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      takeNoteExpand: false,
    };
    this.takeNoteExpand = this.takeNoteExpand.bind(this);
    this.takeNoteRetract = this.takeNoteRetract.bind(this);
    this.renderTakeANoteButtons = this.renderTakeANoteButtons.bind(this);
  }

  takeNoteExpand() {
    this.setState(() => ({
      takeNoteExpand: true,
    }));
  }

  takeNoteRetract() {
    this.setState(() => ({
      takeNoteExpand: false,
    }));
  }

  renderTakeANoteButtons() {
    return [
      <div key={0} role="button" className="note-card__take-note__list" />,
      <div key={1} role="button" className="note-card__take-note__image" />,
      <div key={2} role="button" className="note-card__take-note__draw" />,
    ];
  }

  render() {
    if (this.state.takeNoteExpand) {
      return (
        <div className="note-card note-card--take-note">
          <EditNote noteToEdit={defaultNoteState} onClose={this.takeNoteRetract} onDone={this.props.onDone} />
        </div>
      );
    } else {
      return (
        <div className="note-card note-card--take-note">
          <div className="note-card__container">
            <div
              contentEditable
              data-placeholder={strings.takeANote}
              role="textbox"
              tabIndex={0}
              onKeyDown={this.takeNoteExpand}
              onClick={this.takeNoteExpand}
              className="note-card__textbox"
            />
            {this.renderTakeANoteButtons()}
          </div>
        </div>
      );
    }
  }
}

TakeNote.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default TakeNote;
