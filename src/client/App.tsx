import React, { Component } from 'react';

interface AppProps {
  message: string;
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default App;
