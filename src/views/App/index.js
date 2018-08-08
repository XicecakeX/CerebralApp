import React from 'react';
import {hot} from 'react-hot-loader';
import S from './index.module.css';
import Home from '../Home';

export default hot(module)(
  class App extends React.Component{
    render(){
      return(
        <div className = {S.app}>
          <Home />
        </div>
      );
    }
  }
);
