import React, { Component } from 'react';
import ThesisData from './Components/thesis-data/ThesisData'
import PersonalData from './Components/personal-data/PersonalData';

class App extends Component {
  render() {
    return (
      <main>
        <PersonalData />
      </main>
    );
  }
}

export default App;
