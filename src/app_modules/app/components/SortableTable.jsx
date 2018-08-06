var React = require('react');
var _ = require('lodash');

require('./SortableTable.css');

var Table = require('./TableViewAdapter.jsx');

var SortableTable = React.createClass({
	getInitialState: function() {
        return {
            sortBy: this.props.initialSortBy,
            sortDirection: this.props.initialSortDirection,
            headerRenderer: this.headerRenderer()
        }
    },
    clickColumn: function(label, dataKey){
        var newDirection = true;
        if(this.state.sortBy == dataKey) {
            newDirection = !(this.state.sortDirection);
        }
        this.setState({
            sortBy: dataKey,
            sortDirection: newDirection,
            headerRenderer: this.headerRenderer()
        });
    },
    onResize: function() {
        if (this.refs.table) {
            this.refs.table.onResize();
        }
    },
    headerRenderer: function() {
        return function(label, dataKey) {
            var className = "";
            if(this.state.sortBy == dataKey) {
                if(this.state.sortDirection) {
                    className = "SortableTable__Column-Asc";
                } else {
                    className = "SortableTable__Column-Desc";
                }
            }
            return (
                <div className="SortableTable__ColumnHeader" onClick={this.clickColumn.bind(this, label, dataKey)}>
                    <span className={className}>{label}</span>
                </div>
            );
        }.bind(this);
    },
	render: function() {
		var className =  (this.props.className || "") + " SortableTable";

        var columns = (this.props.columns || []).map(function(column){
            column.headerRenderer = this.state.headerRenderer;
            return column;
        }.bind(this));


        var sortedData = null;
        if(this.state.sortBy) {
            //Find cellRenderer of the column we want to sort by
            var column = _.find(columns, 'dataKey', this.state.sortBy);
            if(column) {
                sortedData = _.sortByOrder((this.props.data || []), [function(row){
                    var value = null;
                    if(column.cellSortGetter != null) {
                        value = column.cellSortGetter(this.state.sortBy, row);
                    } else if (column.cellDataGetter != null) {
                        value = column.cellDataGetter(this.state.sortBy, row);
                    } else {
                        value = row[this.state.sortBy];
                    }
                    if(typeof value === 'string') {
                        value = value.toLowerCase();
                    }
                    return value;
                }.bind(this)], [this.state.sortDirection]);
            }
        }

        if(sortedData == null && _.isObject(this.props.data)) {
            //Convert object to array
            sortedData = _.values(this.props.data);
        }

		return (
			<div className={className}>
				<Table
                    ref='table'
	                columns={columns}
                    data={(sortedData || this.props.data)}
                    onRowClick={this.props.onRowClick}
                    onRowDoubleClick={this.props.onRowDoubleClick}
                    rowClassNameGetter={this.props.rowClassNameGetter}
                    headerHeight={this.props.headerHeight} />
            </div>
		);
	}
});
module.exports = SortableTable;