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
	assetSelected: signal`Home.assetSelected`,
	buttonClicked: signal`Home.buttonClicked`,
	inputUpdated: signal`Home.inputUpdated`,
	viewClicked: signal`Home.viewClicked`,
	addProps: state`Home.addProps`,
	deleteProps: state`Home.deleteProps`,
	disabled: state`Home.disabled`,
	id: state`Home.id`,
	viewProps: state`Home.viewProps`,
}, class Home extends React.Component{

	//DidMount function
	componentDidMount(){
		this.props.mounted();
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
						disabled = {this.props.disabled}
						onClick = {(event) => {this.props.buttonClicked({id: event.target.id})}}/>
					<input type = "button"
						value = "Delete Asset"
						className = {S.button}
						id = "btnDelete"
						disabled = {this.props.disabled}
						onClick = {(event) => {this.props.buttonClicked({id: event.target.id})}}/>
					<input type = "button"
						value = "View Assets"
						className = {S.button}
						id = "btnView"
						disabled = {this.props.disabled}
						onClick = {(event) => {this.props.buttonClicked({id: event.target.id})}}/>
				</div>
				<AddPanel p = {this.props.addProps}/>
				<DeletePanel p = {this.props.deleteProps}/>
				<ViewPanel p = {this.props.viewProps}
					selectAsset = {(data) => {this.props.assetSelected({data: data})}}
					setInput = {(id, value) => {this.props.inputUpdated({id: id, value: value})}}
					handleClick = {(option, value) => {this.props.viewClicked({option: option, value: value})}}/>
			</div>
		);
	}
});
