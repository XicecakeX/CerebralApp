import React from 'react'
import { hot } from 'react-hot-loader'
import styles from './index.module.css';
import Home from '../Home';

class App extends React.Component {
  render() {
    return (
      <div className={styles.app} >
        <Home />
      </div>
    );
  }
}

export default hot(module)(App);
