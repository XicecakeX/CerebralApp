import React from 'react';
import S from './index.module.css';
import ClassNames from 'classnames';

export default class AddPanel extends React.Component{
  /**Rendering Component*/
  render(){
    return(
      <div className = {ClassNames(S[this.props.p.displayPanel], S.panel)}>
        <p> Add</p>
      </div>
    );
  }
}
