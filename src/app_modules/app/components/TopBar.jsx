var React = require('react');

require('./TopBar.css');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;


var TopBar = React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		var className =  (this.props.className || "") + " TopBar";
		return (
			<header className={className}>
				<h1 className="TopBar__Title TopBar__Pull-Left">{this.props.title}</h1>
			</header>
		);
	}
});
module.exports = TopBar;