import React, { Component } from 'react';

import './styles.scss';
import Note from './components/Note';
import NoteList from './components/NoteList/';
import TakeNote from './components/TakeNote/';
import EditNote from './components/EditNote/';

class App extends Component {
  render() {
    return (
      <div className="App">
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

export default App;
