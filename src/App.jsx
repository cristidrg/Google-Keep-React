import React, { Component } from 'react';

import './styles.css';
import Note from './components/Note';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Note note="Done with a note? Use the archive " title="Make a listasasasasa" />
      </div>
    );
  }
}

export default App;
