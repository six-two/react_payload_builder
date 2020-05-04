import React from 'react';
import PropTypes from 'prop-types';
import ChooseOptionView from '../ChooseOptionView'
import Padding from './PaddingEditView'
import Integer from './IntegerEditView'

var TYPES = [Padding.type, Integer.type]

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
         this.props.onChange(this.props.index, newData);
    }

    renderChild(type) {
        switch (type) {
            case Padding.type:
                return (<Padding onChange={this.onChildChange} values={this.props.data} />);
            case Integer.type:
                return (<Integer onChange={this.onChildChange} values={this.props.data} />);
            default:
                return (<span><br/>{"[Error] Unknown type: '" + type + "'"}</span>);
        }
    }

    defaultValues(type) {
        switch (type) {
            case Padding.type:
                return Padding.defaultValues;
            case Integer.type:
                return Integer.defaultValues;
            default:
                return {};
        }
    }
};



HexElementView.propTypes = {
   onChange: PropTypes.func.isRequired,//f(index)
   index: PropTypes.number.isRequired,//wil be used to identify this object
   data: PropTypes.object.isRequired,//{type: "Padding", pattern: string, repeatType: string, number: int}
};

export default HexElementView;