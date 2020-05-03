import React from 'react';
import PropTypes from 'prop-types';
import ChooseOptionView from '../ChooseOptionView'

const REPEAT_N = "Repeat N times"
const REPEAT_TO = "Repeat up to index"

class PaddingEditView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pattern: "A",
            type: REPEAT_N,
            number: 1,
        }
        this.onPatternChange = this.onPatternChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
    }

    static defaultValues() {
        return {
           pattern: "A",
           type: REPEAT_N,
           number: 1,
       };
    }

    render() {
        return <div>
        <input type="text" value={this.state.pattern} onChange={this.onPatternChange} />
        <ChooseOptionView options={[REPEAT_N, REPEAT_TO]} initialValue={REPEAT_N} onChange={this.onTypeChange} />
         <input type="number" min="1" value={this.state.number} onChange={this.onNumberChange} />
          </div>
    }

    onNumberChange(event) {
        this.onChange(this.state.pattern, this.state.type, event.target.value);
    }

    onPatternChange(event) {
        this.onChange(event.target.value, this.state.type, this.state.number);
    }

    onTypeChange(newValue) {
        this.onChange(this.state.pattern, newValue, this.state.number);
    }

    onChange(pattern, type, number) {
        const newState = {
            pattern: pattern,
            type: type,
            number: number,
        };
        this.setState(newState);
        if (this.props.onChange) {
            this.props.onChange(newState);
        }
    }
}

PaddingEditView.propTypes = {
   onChange: PropTypes.func,
};

export default PaddingEditView;