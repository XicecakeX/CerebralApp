import React from 'react';
import S from './index.module.css';
import ClassNames from 'classnames';
import DataField from './DataField';

/**Exporting Component*/
export default class ViewPanel extends React.Component{
  /**generateOptions Function*/
  generateOptions = (data) => {
    //Declaring fields
    let options = [];

    //Iterating through data array
    for(let i = 0; i < data.length; i++){
      //Generating id
      let id = "ID: " + data[i].id;

      //Adding option
      options.push(<option key = {i} value = {id}> {id}</option>);
    }

    //Returning options
    return options;
  }

  /**Rendering Component*/
  render(){
    //Declaring fields
    let p = this.props.p;

    //Returning component
    return(
      <div className = {ClassNames(S[p.displayPanel], S.panel)}>
        <div className = {S.content}>
        <div className = {S.options}>
          <div className = {S.label}> Select by:</div>
          <select value = {p.option}
            className = {S.selectField1}
            id = "selViewOptions"
            disabled = {p.disabled}
            onChange = {(e) => {this.props.setInput(e.target.id, e.target.value)}}>
            <option hidden disabled value = "Choose Option"> Choose Option</option>
            <option value = "ID"> ID</option>
            <option value = "Login"> Login</option>
            <option value = "Password"> Password</option>
            <option value = "First Name"> First Name</option>
            <option value = "Last Name"> Last Name</option>
            <option value = "Dealer"> Dealer</option>
            <option value = "Reseller"> Reseller</option>
            <option value = "Email"> Email</option>
            <option value = "Address"> Address</option>
          </select>
        </div>
        <div className = {ClassNames(S[p.displayInput], S.item)}>
          <div className = {S.label}> Enter {p.option}:</div>
          <input type = "text"
            value = {p.search}
            className = {S.component}
            id = "txtSearch"
            disabled = {p.disabled}
            onChange = {(e) => {this.props.setInput(e.target.id, e.target.value)}}/>
        </div>
        <div className = {ClassNames(S[p.displayInput], S.item)}>
          <input type = "button"
            value = "Search"
            className = {S.button}
            id = "btnSearch"
            disabled = {p.disabled}
            onClick = {() => {this.props.handleClick(p.option, p.search)}}/>
        </div>
        <div className = {ClassNames(S[p.displaySelect], S.item)}>
          <div className = {S.label}> Found Assets:</div>
          <select value = {p.assetOption}
            className = {S.selectField2}
            id = "selViewAssets"
            onChange = {(e) => {this.props.selectAsset(p.viewData[e.target.selectedIndex - 1])}}>
            <option hidden disabled value = "Choose Asset"> Choose Asset</option>
            {this.generateOptions(p.viewData)}
          </select>
        </div>
          <div className = {ClassNames(S[p.displayField], S.item)}>
            <DataField data = {p.viewData}/>
          </div>
        </div>
      </div>
    );
  }
};
