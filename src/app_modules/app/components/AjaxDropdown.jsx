var React = require('react');

require('react-widgets/lib/less/react-widgets.less');
var DropdownList = require('react-widgets/lib/DropdownList');
var _ = require('lodash');

var ListItem = React.createClass({
	render: function() {
		var data = this.props.item;
		return (
			<span>
			{ data }
			</span>
		);
	}
});

var AjaxDropdown = React.createClass({
    getInitialState: function() {
    	return {
    		open: false
       	};
    },
    getDefaultProps: function() {
    	return {
      		itemComponent: ListItem,
      		valueComponent: ListItem
    	};
  	},
    onChange: function(value) {
    	if (this.props.onChange) {
    		var toReturn = {
    			target: {
    				value: value
    			}
    		};
    		this.props.onChange(toReturn);
    	}
    },
    onToggle: function(isOpen) {
    	if (this.isMounted()) {
	    	this.setState({
	    		open: isOpen
	    	});
	    	if (isOpen && this.props.data == null && this.props.loadData) {
	    		this.props.loadData();
	    	}
	    }
    },
	render: function() {
		var messages = null;
		if (this.props.busy) {
			messages = {};
			messages.emptyList = 'Loading...';
		}

		var data = _.values(this.props.data);
		if (this.props.extraValues != null) {
            data = data.concat(this.props.extraValues);
        } else if (this.props.extraValue != null) {
        	data.push(this.props.extraValue);
        }

		return (
            <DropdownList
            	busy={this.props.busy}
            	className={this.props.className}
							disabled={this.props.disabled}
				data={data}
				placeholder={this.props.placeholder}
				valueField={this.props.valueField}
				value={this.props.value}
				onChange={this.onChange}
				itemComponent={this.props.itemComponent}
				valueComponent={this.props.valueComponent}
				open={this.state.open}
				onToggle={this.onToggle}
				messages={messages} />
		);
	}
});
module.exports = AjaxDropdown;
