import React, { Component } from 'react';

import EditNote from '../EditNote';
import strings from '../../strings';

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
      return <EditNote close={this.takeNoteRetract} />;
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

export default TakeNote;
