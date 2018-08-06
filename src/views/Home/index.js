import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'

import classnames from 'classnames'
import styles from './index.module.css'

export default connect({
	mounted: signal`Home.mounted`,
	textChanged: signal`Home.textChanged`,
	clearClicked: signal`Home.clearClicked`,

	message: state`Home.message`,
}, class Home extends React.Component {
	componentDidMount() {
		this.props.mounted();
	}
	render() {
		return (
			<div className={classnames(this.props.className, styles.root)}>
				<div>
		      <div>{this.props.message}</div>
					<input
						type="text"
						value={this.props.message}
						onChange={(evt) => this.props.textChanged({value: evt.target.value})} />
					<button onClick={(evt) => this.props.clearClicked()}>
						{'Clear'}
					</button>
				</div>
			</div>
		);
	}
});
