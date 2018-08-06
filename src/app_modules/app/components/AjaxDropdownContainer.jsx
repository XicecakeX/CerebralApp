var React = require('react');

var AjaxDropdown = require('./AjaxDropdown.jsx');

var ajax = require('../data/ajax.js');

var ListItem = React.createClass({
	render: function() {
		var data = this.props.item;
		return (
			<span>
			{ data.name }
			</span>
		);
	}
});

var AjaxDropdownContainer = React.createClass({
    getInitialState: function() {
    	return {
            loading: false
    	};
    },
    onChange: function(evt) {
    	if (this.props.onChange) {
            this.props.onChange(evt);
        }
    },
    loadData: function() {
        if (this.isMounted()) {
            this.setState({
                loading: true
            });
            ajax.costCenters().then((data) => {
                if (this.isMounted()) {
                    this.setState({
                        data: _.values(data),
                        loading: false
                    });
                }
            });
        }
    },
	render: function() {
		return (
            <AjaxDropdown
                busy={this.state.loading}
                loadData={this.loadData}
				data={this.state.data}
				placeholder={null}
				valueField={'id'}
				value={this.props.value}
				onChange={this.onChange}
				open={this.state.open}
                itemComponent={ListItem}
                valueComponent={ListItem} />
		);
	}
});
module.exports = AjaxDropdownContainer;