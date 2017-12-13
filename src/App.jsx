import React, { Component } from 'react';

import './styles.scss';
import Note from './components/Note';
import NoteList from './components/NoteList/';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="app__header" />
        <div className="left__column" />
        <div className="content">
          <NoteList />
          <Note takeANote />
          <br />
          <br />
          <Note editMode />
        </div>
      </div>
    );
  }
}

export default App;
