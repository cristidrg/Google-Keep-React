import React from 'react';
import PropTypes from 'prop-types';

import './Note.scss';

import Textbox from './Textbox';
import strings from '../../strings';
import { pin, select } from '../../assets/';
import { Button } from '../ElementWrappers/';

//TODO: TRIGGER ON CONTAINER CLICK WHEN CONTAINER IS FOCUSED AND ENTER IS PRESSED

const noteStrings = {
  TITLE: 'title',
  TEXTBOX: 'textbox',
};

const DumbNote = (props) => {
  return (
    <div className={`note-card ${props.class}`}>
      {Button({
          ariaLabel: strings.selectAria,
          ariaPressed: props.selected,
          className: 'note-card__select',
          icon: select,
          onInteraction: props.selectNote,
        })}
      <div className="note-card__container">
        <div className="note-card__title" onClick={props.onContainerClick(noteStrings.TITLE)}>{props.title}</div>
        {Button({
          ariaLabel: strings.pinAria,
          ariaPressed: props.pinned,
          className: 'note-card__pin',
          icon: pin,
          onInteraction: props.pinNote,
        })}
        <Textbox onClick={props.onContainerClick(noteStrings.TEXTBOX)} editable={false} note={props.note} />
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
};

DumbNote.propTypes = {
  class: PropTypes.string,
  title: PropTypes.string,
  note: PropTypes.string,
  selected: PropTypes.bool,
  pinned: PropTypes.bool,
  pinNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  onContainerClick: PropTypes.func.isRequired,
};

DumbNote.defaultProps = {
  class: '',
  title: '',
  note: '', // These should properly have newline characters and be already trimmed to under 400 characters
  selected: false,
  pinned: false,
};

export { noteStrings, DumbNote };
export default DumbNote;
