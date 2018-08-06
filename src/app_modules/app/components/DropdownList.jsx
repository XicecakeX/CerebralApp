var React = require('react');

import styles from './DropdownList.lcss';

var classnames = require('classnames');
var _ = require('lodash');

require('react-widgets/lib/less/react-widgets.less');
var DropdownListWidget = require('react-widgets/lib/DropdownList');

var DropdownList = React.createClass({
    render: function() {
    	var dropdown = <DropdownListWidget className={ classnames(this.props.className, styles.root) } />;
        return React.cloneElement(dropdown, _.omit(this.props, 'className'));
    }
});
module.exports = DropdownList;