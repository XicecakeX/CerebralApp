var React = require('react');

require('./TableViewAdapter.css');
require('fixed-data-table/dist/fixed-data-table-base.css');
require('fixed-data-table/dist/fixed-data-table-style.css');

var classnames = require('classnames');

var OnResize = require("react-window-mixins").OnResize;
var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var isColumnResizing;

var TableViewAdapter = React.createClass({
	mixins: [ OnResize ],
	getInitialState: function() {
        return {
            columnWidths: {},
            componentWidth: 100,
            componentHeight: 100
        }
    },
    onResize: function() {
		this.setState({
			componentWidth: this.getDOMNode().clientWidth,
			componentHeight: this.getDOMNode().clientHeight
		});
	},
	_rowGetter: function(rowIndex) {
        if(this.props.data) {
            return this.props.data[rowIndex];
        } else {
            return null;
        }
    },
    _onColumnResizeEndCallback: function(newColumnWidth, dataKey) {
        var curColumnWidths = this.state.columnWidths;
        if(newColumnWidth < 9) newColumnWidth = 9;
        curColumnWidths[dataKey] = newColumnWidth;
        isColumnResizing = false;
        this.setState({
            columnWidths: curColumnWidths
        });
    },
    _onRowClick: function(event, index, row) {
        if(this.props.onRowClick) {
            this.props.onRowClick(index, row);
        }
    },
    _onRowDoubleClick: function(event, index, row) {
        if(this.props.onRowDoubleClick) {
            this.props.onRowDoubleClick(index, row);
        }
    },
    _rowClassNameGetter: function(index) {
        if (this.props.rowClassNameGetter) {
            var row = this.props.data[index];
            return this.props.rowClassNameGetter(index, row);
        }       
    },
	render: function() {
		var className =  classnames(this.props.className, 'TableViewAdapter');

        var columns = (this.props.columns || []).map(function(column) {
            var flexGrow = column.flexGrow || 1;
            var label = column.label || "";
            var isResizable = (column.isResizable != null) ? column.isResizable : true;
            var columnWidth = this.state.columnWidths[column.dataKey];
            if(columnWidth != null) {
                flexGrow = 0;
            } else {
                if (column.initialWidth == null) {
                    columnWidth = 1;
                } else {
                    var percent = false;
                    var amount = 0;

                    if (_.isString(column.initialWidth) && column.initialWidth.indexOf('%') != -1) {
                        //Remove percent sign, and calcuate based on percent
                        percent = true;
                        amount = parseFloat(column.initialWidth.replace('%', ''));
                        amount = amount / 100;
                    } else {
                        //Parse output
                        var width = column.initialWidth + '';
                        amount = parseFloat(width.replace('px', ''));
                        if(amount < 1) {
                            percent = true;
                        }
                    }

                    if (isNaN(amount)) {
                        amount = 100;
                        percent = false;
                    }

                    if (percent) {
                        columnWidth = amount * this.state.componentWidth;
                    } else {
                        //Pixals
                        columnWidth = amount;
                    }
                }
            }
            return <Column key={column.dataKey} dataKey={column.dataKey}  width={columnWidth} headerRenderer={column.headerRenderer} cellDataGetter={column.cellDataGetter} label={label} flexGrow={flexGrow} isResizable={isResizable} />
        }.bind(this));

		return (
			<div className={className}>
				<Table
	           		rowHeight={50}
	                rowGetter={this._rowGetter}
	                rowsCount={(this.props.data || []).length}
	                width={this.state.componentWidth - 2}
	                height={this.state.componentHeight - 2}
	                headerHeight={this.props.headerHeight || 50}
	                isColumnResizing={isColumnResizing}
	                onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    onRowClick={this._onRowClick}
                    onRowDoubleClick={this._onRowDoubleClick}
                    rowClassNameGetter={this._rowClassNameGetter}>
                    {columns}
	            </Table>
            </div>
		);
	}
});
module.exports = TableViewAdapter;