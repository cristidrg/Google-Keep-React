import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { noteFilters } from '../NoteList/';
import NoteList from '../NoteList/';
import TakeNote from '../TakeNote/';
import strings from '../../strings';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.getAppContent = this.getAppContent.bind(this);
  }

  getAppContent() {
    let pinnedHeading, unpinnedHeading;
    if (this.props.hasPinnedNotes) {
      pinnedHeading = strings.pinned;
      unpinnedHeading = strings.others;
    }

    return (
      <div className="content">
        <TakeNote />
        <NoteList heading={pinnedHeading} filterOptions={{ id: noteFilters.PINNED }} />
        <NoteList heading={unpinnedHeading} filterOptions={{ id: noteFilters.UNPINNED }} />       
      </div>
    );
  }

  render() {
    return (
      <div className="appLayout">
        <header className="app__header" />
        <div className="left__column" />
        {this.getAppContent()}
      </div>
    );
  }
}

Layout.propTypes = {
  hasPinnedNotes: PropTypes.bool.isRequired,
};

export default Layout;
