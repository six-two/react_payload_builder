import React from 'react';
import ChooseOptionView from '../ChooseOptionView';
import * as Int from "../../hex/Integer";

const INT_SIZES = [Int.INT_8, Int.INT_16, Int.INT_32, Int.INT_64];
const LABLES = [" as ", " integer"]

export default class IntegerEditView extends React.Component<Props, {}> {
  render() {
    return (
      <div className="edit-container">
        <input type="text"
          value={this.props.values.numberString}
          onChange={this.onValueChange} />
        {LABLES[0]}
        <ChooseOptionView
          value={this.props.values.numberType}
          onChange={this.onTypeChange}
          options={INT_SIZES} />
        {LABLES[1]}
      </div>
    );
  }

  onTypeChange = (newValue: string) => {
    this.onChange({ numberType: newValue });
  }

  onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // only allow certain input characters: hex and 'o' and 'x' for 0x/0b
    const newValue = event.target.value;
    if (/^([0-9a-fA-Fxo]*)$/.test(newValue)) {
      this.onChange({ numberString: newValue });
    }
  }

  onChange(changedValues: any) {
    this.props.onChange(Object.assign({}, this.props.values, changedValues));
  }
}

interface Props {
  values: Int.Values,
  onChange: (newValues: Int.Values) => void,
}
