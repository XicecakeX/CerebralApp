var React = require('react');

require('./DetailsCard.css');

var DetailsCard = React.createClass({
    renderRows: function() {
        var rows = this.props.data || [];
        var i=0;
        return _.map(rows, function(row){
            i=i+1;
            return (
                    <div key={i}>
                        <li className="DetailsCard-Info-Key">{row.name}</li>
                        <li className="DetailsCard-Info-Value">{row.value}</li>
                    </div>
                );
        });
    },
    onEditClick: function() {
        if (this.props.onEditClick) {
            this.props.onEditClick(this.props.title);
        }
    },
    render: function() {
        var className =  (this.props.className || "") + " DetailsCard";
        return (
            <div className={className}>
                <div className="DetailsCard-Title">{this.props.title}</div>
                <ul className="DetailsCard-Info">
                    {this.renderRows()}
                </ul>
                <div className="DetailsCard-Edit" onClick={this.onEditClick}>
                    Edit
                </div>
            </div>
        );
    }
});
module.exports = DetailsCard;