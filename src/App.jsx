import React, { Component } from 'react';

import './styles.css';
import Note from './components/Note';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Note title="Make a listasasasasa" />
        <br />
        <br />
        <br />
        <Note note="abc" />
        <br />
        <br />
        <br />
        <Note note="abc" title="Make a listasasasasa" />
      </div>
    );
  }
}

export default App;
