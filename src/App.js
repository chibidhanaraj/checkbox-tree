import React from 'react';
import * as data from './example.json';
import Zones from './Zones';

const ZONES = data.default.zones;

class App extends React.Component {
  render() {
    return (
      <div>
        <Zones zones={ZONES} />
      </div>
    )
  }
}

export default App;
