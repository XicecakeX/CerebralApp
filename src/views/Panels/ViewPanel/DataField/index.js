import React from 'react';
import S from './index.module.css';

export default class DataField extends React.Component{
  /**emptyCheck Function*/
  emptyCheck = (value) => {
    //Checking value
    if(value === ""){
      //Returning null
      return "N/A";
    }else{
      //Returning value
      return value;
    }
  }

  /**Rendering Component*/
  render(){
    return(
      <fieldset className = {S.fieldset}>
        <div className = {S.content}>
          <div className = {S.column}>
            <div className = {S.item}>
              <div className = {S.label}> ID:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.id)}</div>
            </div>
            <div className = {S.item}>
              <div className = {S.label}> Login:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.login)}</div>
            </div>
            <div className = {S.item}>
              <div className = {S.label}> First Name:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.firstName)}</div>
            </div>
            <div className = {S.item}>
              <div className = {S.label}> Dealer:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.dealer)}</div>
            </div>
            <div className = {S.item}>
              <div className = {S.label}> Email:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.email)}</div>
            </div>
          </div>
          <div className = {S.column}>
            <div className = {S.item}>
              <div className = {S.label}> PAQSubID:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.subID)}</div>
            </div>
            <div className = {S.item}>
              <div className = {S.label}> Password:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.password)}</div>
            </div>
            <div className = {S.item}>
              <div className = {S.label}> Last Name:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.lastName)}</div>
            </div>
            <div className = {S.item}>
              <div className = {S.label}> Reseller:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.reseller)}</div>
            </div>
            <div className = {S.item}>
              <div className = {S.label}> Address:</div>
              <div className = {S.data}> {this.emptyCheck(this.props.data.address)}</div>
            </div>
          </div>
        </div>
      </fieldset>
    );
  }
}
