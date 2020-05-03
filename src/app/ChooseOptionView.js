import React from 'react';
import PropTypes from 'prop-types';

class ChooseOptionView extends React.Component {
    constructor(props) {
        super(props);
        var initialValue = props.initialValue? props.initialValue : "";
        this.state = {value: initialValue}
        // Prevent crash
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const new_value = event.target.value
        this.setState({            value: new_value        });
        console.debug("[ChooseOptionView] "+new_value);
        if (this.props.onChange) {
            this.props.onChange(new_value);
        }
    }

    render() {
        return (<select id="choose-option" onChange={this.handleChange} value={this.state.value}>
             <option value="" selected disabled hidden>
             {this.props.prompt ? this.props.prompt : "Choose a option"}
             </option>
                {this.props.options.map((value) => {return <option value={value}>{value}</option>;})}
         </select>);
    }
}

ChooseOptionView.propTypes = {
    prompt: PropTypes.string,
    initialValue: PropTypes.string,
    options: PropTypes.array.isRequired,
    callback: PropTypes.func,
}


export default ChooseOptionView;