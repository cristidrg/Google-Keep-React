import React, { Component } from 'react';

import './styles.css';
import Note from './components/Note';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Note note="Done with a note? Use the archive " title="Make a listasasasasa" />
        <br />
        <br />
        <Note takeANote />
        <br />
        <br />
        <Note editMode />
      </div>
    );
  }
}

export default App;
