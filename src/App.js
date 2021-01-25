import React, { Component } from 'react';

import AddStudent from './components/add-student/addStudent-container'

class App extends Component {
  render() {
    return (
      <div className="App">
        Post graduate system
        <AddStudent />
      </div>
    );
  }
}

export default App;
