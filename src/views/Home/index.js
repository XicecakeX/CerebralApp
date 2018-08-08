import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import ClassNames from 'classnames'
import S from './index.module.css'
import AddPanel from '../Panels/AddPanel';
import DeletePanel from '../Panels/DeletePanel';
import ViewPanel from '../Panels/ViewPanel';

export default connect({
	mounted: signal`Home.mounted`,
	buttonClicked: signal`Home.buttonClicked`,
	viewClicked: signal`Home.viewClicked`,
	disabled: state`Home.disabled`,
	id: state`Home.id`,
}, class Home extends React.Component{

	//DidMount function
	componentDidMount(){
		this.props.mounted();
	}

	//displayPanels function
	displayPanels = () => {
		//Declaring fields
		let id = this.props.id;

		//Checking id
		if(id === "btnAdd"){
			//Returning add panel
			return (<AddPanel />);
		}else if(id === "btnDelete"){
			//Returning delete panel
			return (<DeletePanel />);
		}else if(id === "btnView"){
			//Returning view panel
			return (<ViewPanel disabled = {this.props.disabled}
								handleClick = {(option, value) => {this.props.viewClicked({option: option, value: value})}}/>);
		}
	}

	//Rendering component
	render(){
		return(
			<div className = {S.content}>
				<h1> Asset Manager</h1>
				<div className = {S.options}>
					<input type = "button"
						value = "Add Asset"
						className = {S.button}
						id = "btnAdd"
						onClick = {(event) => {this.props.buttonClicked({id: event.target.id})}}/>
					<input type = "button"
						value = "Delete Asset"
						className = {S.button}
						id = "btnDelete"
						onClick = {(event) => {this.props.buttonClicked({id: event.target.id})}}/>
					<input type = "button"
						value = "View Assets"
						className = {S.button}
						id = "btnView"
						onClick = {(event) => {this.props.buttonClicked({id: event.target.id})}}/>
				</div>
				{this.displayPanels()}
			</div>
		);
	}
});
