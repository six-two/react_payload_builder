import React from 'react';
import PropTypes from 'prop-types';

class ChooseOptionView extends React.Component {
//    constructor(props) {
//        super(props);
//    }

    static defaultValue() {
        return "";
    }

    render() {
        return (<select onChange={(event) => {this.props.onChange(event.target.value)}} value={this.props.value}>
             <option value="" key={-1} disabled hidden>
                {this.props.prompt ? this.props.prompt : "Choose a option"}
             </option>
             {this.props.options.map((value, i) => {
                return <option value={value} key={i}>{value}</option>;
             })}
         </select>);
    }
}

ChooseOptionView.propTypes = {
    prompt: PropTypes.string,
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default ChooseOptionView;