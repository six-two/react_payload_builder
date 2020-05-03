import React from 'react';
import PropTypes from 'prop-types';
import ChooseOptionView from './ChooseOptionView'
import Padding from './hextypes/Padding'

var TYPES = ["Padding", "Test123"]

class HexElementView extends React.Component {
    constructor(props) {
        super(props);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onChildChange = this.onChildChange.bind(this);
    }

    render() {
        return (
            <div>
                <label>Type:</label>
                <ChooseOptionView value={this.props.data.type} options={TYPES} onChange={this.onTypeChange}/>

                {this.renderChild(this.props.data.type)}
            </div>
        );
    }

    onTypeChange(newType) {
        this.onChange(newType, this.defaultValues(newType));
    }

    onChildChange(newValues) {
        this.onChange(this.props.data.type, newValues);
    }

    onChange(newType, newValues) {
         const newData = Object.assign(newValues, {type: newType});
         console.debug("[HexElementView] onChange: %o", newData)
         this.props.onChange(this.props.index, newData);
    }

    renderChild(type) {
        switch (type) {
            case Padding.type:
                return <Padding onChange={this.onChildChange} values={this.props.data} />
            default:
                return <span><br/>{"[Error] Unknown type: '" + type + "'"}</span>
        }
    }

    defaultValues(type) {
        switch (type) {
            case Padding.type:
                return Padding.defaultValues;
            default:
                return {};
        }
    }
};



HexElementView.propTypes = {
   onChange: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired,
   index: PropTypes.number.isRequired,
   data: PropTypes.object.isRequired,
};

export default HexElementView;