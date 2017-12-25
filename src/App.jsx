import React, { Component } from 'react';

import './styles.scss';
import Layout from './components/Layout/';
import EditPortal from './components/EditPortal';

/**
 * @REACT_BP -- Usage of Fragments
 * Since I want to use a portal in my app, I wanted to use a fragment here rather than putting another div and create a div soup.
 */
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout />
        <EditPortal />
      </React.Fragment>
    );
  }
}

export default App;
