import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import NoteList from '../NoteList/';
import TakeNote from '../TakeNote/';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.handleEditClose = this.handleEditClose.bind(this);
  }

  handleEditClose() {
    return 0;
  }

  render() {
    return (
      <div className="appLayout">
        <header className="app__header" />
        <div className="left__column" />
        <div className="content">
          <NoteList />
          <br />
          <TakeNote />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default Layout;
