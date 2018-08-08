import React from 'react';
import S from './index.module.css';
import ClassNames from 'classnames';

/**Exporting Component*/
export default class ViewPanel extends React.Component{
  /**Default Constructor*/
  constructor(){
    super();
    this.state = {
      display: "hidden",
      option: "Choose Option",
      search: ""
    };
  }

  /**checkEmpty Function*/
  checkEmpty = () => {
    //Checking state
    if(this.state.search === ""){
      //Returning true
      return true;
    }else{
      //Returning false
      return false;
    }
  }

  /**Rendering Component*/
  render(){
    return(
      <div className = {S.panel}>
        <div className = {S.content}>
          <div className = {S.options}>
            <div className = {S.component}> Select by: </div>
            <select value = {this.state.option}
              className = {S.selectField}
              id = "selViewOptions"
              disabled = {this.props.disabled}
              onChange = {(event) => {this.setState({display: "display", option: event.target.value})}}>
              <option hidden disabled value = "Choose Option"> Choose Option</option>
              <option value = "Index"> Index</option>
              <option value = "ID"> ID</option>
            </select>
          </div>
          <div className = {ClassNames(S[this.state.display], S.item)}>
            <div className = {S.component}> Enter {this.state.option}:</div>
            <div>
              <input type = "text"
                value = {this.state.search}
                className = {S.component}
                id = "txtSearch"
                disabled = {this.props.disabled}
                onChange = {(event) => {this.setState({search: event.target.value})}}/>
            </div>
          </div>
          <div className = {ClassNames(S[this.state.display], S.buttons)}>
            <input type = "button"
              value = "Search"
              className = {S.button}
              id = "btnSearch"
              disabled = {this.props.disabled}
              onClick = {() => {this.props.handleClick(this.state.option, this.state.search)}}/>
          </div>
        </div>
      </div>
    );
  }
};
