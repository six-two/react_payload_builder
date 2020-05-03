import React from 'react';
import PropTypes from 'prop-types';
import HexBuilderStore from './HexBuilderStore'
import ChooseOptionView from './ChooseOptionView'
import Padding from './hextypes/Padding'

var TYPES = ["Padding"]

class HexElementView extends React.Component {
    constructor(props) {
        super(props);
        this.onTypeChange = this.onTypeChange.bind(this);
    }

    render() {
        return <div>
        {this.props.index + " | "}
         <label for="hex-type">Type:</label>

            <ChooseOptionView prompt="Choose" options={TYPES} onChange={this.onTypeChange}/>

         {this.renderChild(this.props.type)}
          </div>
    }

    onTypeChange(newValue) {
//         event.preventDefault();
        console.log("Key: "+this.props.key+", newType: "+newValue);
    }

    onChildChange() {
    }

    renderChild(type) {
        switch (type) {
            case TYPES[0]:
                return <Padding onChange={this.onChildChange} />
            default:
                return <p>"Error: Unknown type"</p>
        }
    }
}

HexElementView.propTypes = {
   store: PropTypes.instanceOf(HexBuilderStore),
   key: PropTypes.number.isRequired,
   index: PropTypes.number.isRequired,
   data: PropTypes.object.isRequired
};

export default HexElementView;