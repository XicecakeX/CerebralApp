var React = require('react');
var _ = require('lodash');

var Fuse = require('app/libs/qfuse.js');
var Table = require('app/components/SortableTable.jsx');

var FilterTable = React.createClass({
     getModels: function() {
        if(this.props.search == null || this.props.search.length == 0) {
            return this.props.data;
        }
        //Fuzzy search
        var options = {
            keys: this.props.searchKeys || [],
            threshold: this.props.threshold || 0.0,
            includeScore: true
        }
        var fuse = new Fuse(_.values(this.props.data), options).search(this.props.search);
        var result = [];
        if (_.find(fuse, {'score': 0})) {
            result = _.filter(fuse, function(obj) {
                return obj.score === 0;
            });
            result = _.map(result, function(obj) {
                return obj.item;
            });
        } else {
            result = _.map(fuse, function(obj) {
                return obj.item;
            });
        }
        return result;
    },
    onResize: function() {
        if (this.refs.table) {
            this.refs.table.onResize();
        }
    },
	render: function() {
		var className =  (this.props.className || "") + " SortableTable";
		return (
			<Table
                ref='table'
                className={this.props.className}
                columns={this.props.columns}
                data={this.getModels()}
                onRowClick={this.props.onRowClick}
                onRowDoubleClick={this.props.onRowDoubleClick}
                rowClassNameGetter={this.props.rowClassNameGetter}
                selectedRow={this.props.selectedRow}
                initialSortBy={this.props.initialSortBy}
                initialSortDirection={this.props.initialSortDirection} />
		);
	}
});
module.exports = FilterTable;