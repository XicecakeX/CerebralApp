
var React = require('react');
require("./Scrollable.css");

var Scrollable = React.createClass({
    render: function() {
    	var className = 'Scrollable ' + (this.props.className || '');
    	if (this.props.disableScrolling) {
    		className = className + " Scrollable-DisableScrolling";
    	}
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Scrollable;
