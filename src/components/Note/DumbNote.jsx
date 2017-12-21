import React from 'react';
import PropTypes from 'prop-types';

import './Note.scss';

import Pin from './Pin';
import Select from './Select';
import Textbox from './Textbox';

const DumbNote = props => (
  <div className="note-card">
    {Select({ ariaPressed: props.selected, onInteraction: props.selectNote })}
    <div className="note-card__container">
      <div className="note-card__title">{props.title}</div>
      {Pin({ ariaPressed: props.pinned, onInteraction: props.pinNote })}
      <Textbox editable={false} note={props.note} />
      <div role="toolbar" className="note-card__toolbar">
        <div role="button" className="note-card__toolbar__remind" />
        <div role="button" className="note-card__toolbar__collaborator" />
        <div role="button" className="note-card__toolbar__color" />
        <div role="button" className="note-card__toolbar__image" />
        <div role="button" className="note-card__toolbar__archive" />
        <div role="button" className="note-card__toolbar__more" />
      </div>
    </div>
  </div>
);

DumbNote.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  selected: PropTypes.bool,
  pinned: PropTypes.bool,
  pinNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
};

DumbNote.defaultProps = {
  title: '',
  note: '', // These should properly have newline characters and be already trimmed to under 400 characters
  selected: false,
  pinned: false,
};

export default DumbNote;
