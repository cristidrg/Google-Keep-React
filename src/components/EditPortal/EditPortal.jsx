import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import EditNote from '../EditNote/';
import Portal from '../Portal';
import { appModes } from '../../reducers/appMode';

import './EditPortal.scss';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  noteToEdit: PropTypes.object,
};

const EditPortal = (props) => {
  const editPortalClass = classNames({
    editPortal: true,
    'editPortal editPortal--visible': props.mode === appModes.EDIT,
  });
  
  return (
    <Portal>
      <div className={editPortalClass}>
        {props.mode === appModes.EDIT ?
          <EditNote
            noteToEdit={props.noteToEdit}
            onClose={props.onClose}
            onDone={props.onDone}
          />
          : ''
        }
      </div>
    </Portal>
  );
};

EditPortal.propTypes = propTypes;

export default EditPortal;
