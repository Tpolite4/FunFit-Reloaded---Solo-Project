import React, { Component } from 'react';
import './styles.css';
import Header from './components/Header';
// import CartoonFlex from './assets/cartoon-flex.png';

// interface AppProps {
//   message: string;
// }

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Welcome to my React App!</h1>
        <p>
          A startup application created by yours truly as he navigates his way
          through learning both front-end and back-end web development without
          crashing out.
        </p>
        {/* <img src={CartoonFlex} alt='Cartoon Flex' /> */}
      </div>
    );
  }
}

export default App;
