import React from 'react';
import S from './index.module.css';

export default class AddPanel extends React.Component{
  /**Rendering Component*/
  render(){
    return(
      <div className = {S.panel}>
        <p> Add</p>
      </div>
    );
  }
}
