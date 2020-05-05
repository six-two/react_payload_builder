import React from 'react';
import ChooseOptionView from '../ChooseOptionView';
import * as Int from "../../hex/Integer";

const INT_SIZES = [Int.INT_8, Int.INT_16, Int.INT_32, Int.INT_64];


export default class HexIntegerView extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    static get defaultValues(): Int.Values {
        return Int.Utils.defaultValues();
    }

    static get type(): string {
        return Int.TYPE;
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

    onTypeChange(newValue: string) {
        this.onChange(newValue, this.props.values.numberString)
    }

    onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.onChange(this.props.values.numberType, event.target.value);
    }

    onChange(numberType: string, numberString: string) {
        this.props.onChange({numberType: numberType, numberString: numberString, type: HexIntegerView.type});
    }

    renderErrorMessages(): any {
        var error = Int.Utils.getErrorMessage(this.props.values);

        if (error) {
            return <span style={{color: "red"}}>Error: {error}</span>
        }
    }
}

interface Props {
  values: Int.Values,
  onChange: (newValues: Int.Values) => void,
}
