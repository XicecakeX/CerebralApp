var React = require('react');

require('./DetailsModal.css');

var _ = require('lodash');
var colors = require('app/styles/colors.js');

var DetailsModal = React.createClass({
	getInitialState: function() {
        return {

        }
    },
    onClose: function() {
        if(this.props.onClose) {
            this.props.onClose();
        }
    },
    onSectionClick: function(sectionValue) {
        if(this.props.onSectionClick) {
            if (this.refs.component && this.refs.component.beforeSectionChange) {
                this.refs.component.beforeSectionChange(function(err) {
                    if (!err) {
                        this.props.onSectionClick(sectionValue);
                    }
                }.bind(this));
            } else {
                this.props.onSectionClick(sectionValue);
            }
        }
    },
    renderNav: function() {
        var circles = (this.props.sections || []).map(function(section) {
            var className = " " + (section.iconClass || "Default");
            var liClass = "";
            if (this.props.selectedSection && this.props.selectedSection == section.value) {
                className = className + " Selected";
            }

            var componentClass = section.component.class;
            var componentProps = section.component.props || {};
            if (componentClass.invalid != null &&  componentClass.invalid(componentProps).length > 0) {
                liClass = "Invalid";
            }
            return (
                <li className={liClass} key={section.value} onClick={this.onSectionClick.bind(this, section.value)}><span className={"DetailsModal__Box-Nav-List-Icon"+className} /></li>
            );
        }.bind(this));
        return circles;
    },
    allValid: function() {
        var sections = this.props.sections || [];
        for (var i=0; i<sections.length; i++) {
            var componentClass = sections[i].component.class;
            var componentProps = sections[i].component.props || {};
            if (componentClass.invalid != null &&  componentClass.invalid(componentProps).length > 0) {
                return false;
            }
        }
        return true;
    },
    Rerender: function() {
        //Rerender nav
        this.forceUpdate();
    },
	render: function() {
		var className =  (this.props.className || "") + " DetailsModal";
        var selectedIndex = _.findIndex(this.props.sections, {'value': this.props.selectedSection});
        if(selectedIndex == -1) {
            console.warn("No selected section for DetailsModal");
            selectedIndex = 0;
        }
        var selectedSection = this.props.sections[selectedIndex];

        var componentClass = selectedSection.component.class;
        var componentProps = selectedSection.component.props || {};
        componentProps.ref = "component";
        componentProps.onClose = this.onClose;
        componentProps.Rerender = this.Rerender;
        componentProps.canSave = this.allValid();
        componentProps.color = colors['cardColor' + selectedIndex];
        if (componentClass.invalid) {
            componentProps.invalid = componentClass.invalid(componentProps);
        }
		return (
			<div className={className}>
                <div className="DetailsModal__Box">
                    <div className={"DetailsModal__Box-Nav"} style={ {backgroundColor: colors['cardColor' + selectedIndex]} }>
                        <div className="DetailsModal__Box-Nav-Exit" onClick={this.onClose}>{"x"}</div>
                        <div className="DetailsModal__Box-Nav-Title">{selectedSection.title}</div>
                        <ul className="DetailsModal__Box-Nav-List">
                            {this.renderNav()}
                        </ul>
                    </div>
                    <div className="DetailsModal__Box-Component">
                        {React.createElement(componentClass, componentProps)}
                    </div>
                </div>
            </div>
		);
	}
});
module.exports = DetailsModal;