import React, { Component } from 'react';

import './styles.scss';
import Note from './components/Note';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="app__header" />
        <div className="left__column" />
        <div className="content">
          <Note note="Done with a note? Use the archive " title="Make a listasasasasa" />
          <br />
          <br />
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
