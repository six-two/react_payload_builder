/* global BigInt */

import React from 'react';
import PropTypes from 'prop-types';
import ChooseOptionView from '../ChooseOptionView';

const INT_8 = "8 bit";
const INT_16 = "16 bit";
const INT_32 = "32 bit";
const INT_64 = "64 bit";
const INT_SIZES = [INT_8, INT_16, INT_32, INT_64];
const MAX_INT_MAP = {
    [INT_8]: 0xffn,
    [INT_16]: 0xffffn,
    [INT_32]: 0xffffffffn,
    [INT_64]: 0xffffffffffffffffn,
}

class HexIntegerView extends React.Component {
    constructor(props) {
        super(props);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    static get defaultValues() {
        return {
           numberString: "0x41414141",
           numberType: INT_32,
           type: HexIntegerView.type,
       };
    }

    static get type() {
        return "Integer"
    }

    render() {
        return (
            <div>
                <ChooseOptionView
                    value={this.props.values.numberType}
                    onChange={this.onTypeChange}
                    options={INT_SIZES} />
                <input type="text"
                    value={this.props.values.numberString}
                    onChange={this.onValueChange} />
                {this.renderErrorMessages()}
            </div>
        );
    }

    onTypeChange(newValue) {
        this.onChange(newValue, this.props.values.numberString)
    }

    onValueChange(event) {
        this.onChange(this.props.values.numberType, event.target.value);
    }

    onChange(numberType, numberString) {
        this.props.onChange({numberType: numberType, numberString: numberString, type: HexIntegerView.type});
    }

    static parseNumber(string) {
        // Remove characters that can be used to make strings more human readable
        string = string.replace(/[\s_]+/g, "");
        return BigInt(string);
    }

    renderErrorMessages() {
        var error = "";
        try {
            var num = HexIntegerView.parseNumber(this.props.values.numberString);
            const type = this.props.values.numberType;
            const max = MAX_INT_MAP[type];
            if (num > max){
                error = `Number to big for '${type}'`;
            }
            if (num < 0) {
                const min = -(max + 1n) / 2n;
                if (num < min) {
                    error = `Number to big for '${type}'`;
                }
            }
        } catch (e) {
            error = "Parsing integer failed";
        }
        if (error) {
            return <span style={{color: "red"}}>Error: {error}</span>
        }
    }

}

HexIntegerView.propTypes = {
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default HexIntegerView;