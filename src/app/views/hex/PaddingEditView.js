import React from 'react';
import PropTypes from 'prop-types';
import ChooseOptionView from '../ChooseOptionView'

const REPEAT_N = "Repeat N times"
const REPEAT_TO = "Repeat up to index"

class PaddingEditView extends React.Component {
    constructor(props) {
        super(props);
        this.onPatternChange = this.onPatternChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
    }

    static get defaultValues() {
        return {
           pattern: "A",
           repeatType: REPEAT_N,
           number: 1,
           type: PaddingEditView.type,
       };
    }

    static get type() {
        return "Padding"
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={this.props.values.pattern}
                    onChange={this.onPatternChange} />
                <ChooseOptionView
                    value={this.props.values.repeatType}
                    onChange={this.onTypeChange}
                    options={[REPEAT_N, REPEAT_TO]} />
                <input type="number" min="1"
                    value={this.props.values.number}
                    onChange={this.onNumberChange} />
            </div>);
    }

    onNumberChange(event) {
        this.onChange({number: event.target.value});
    }

    onPatternChange(event) {
        this.onChange({pattern: event.target.value});
    }

    onTypeChange(newValue) {
        this.onChange({repeatType: newValue});
    }

    onChange(changedValues) {
        this.props.onChange(Object.assign({}, this.props.values, changedValues));
    }
}

PaddingEditView.propTypes = {
    values: PropTypes.object.isRequired, //{number: int, pattern: string, repeatType: string, ?type: string}
    onChange: PropTypes.func.isRequired,
};

export {REPEAT_N, REPEAT_TO};
export default PaddingEditView;