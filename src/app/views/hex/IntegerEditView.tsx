import React from 'react';
import ChooseOptionView from '../ChooseOptionView';
import * as Int from "../../hex/Integer";

const INT_SIZES = [Int.INT_8, Int.INT_16, Int.INT_32, Int.INT_64];
const LABLES = [" as ", " integer"]

export default class HexIntegerView extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={this.props.values.numberString}
                    onChange={this.onValueChange} />
                {LABLES[0]}
                <ChooseOptionView
                    value={this.props.values.numberType}
                    onChange={this.onTypeChange}
                    options={INT_SIZES} />
                {LABLES[1]}
                {this.renderErrorMessages()}
            </div>
        );
    }

    onTypeChange(newValue: string) {
        this.onChange({numberType: newValue});
    }

    onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.onChange({numberString: event.target.value});
    }

    onChange(changedValues: any) {
        this.props.onChange(Object.assign({}, this.props.values, changedValues));
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
