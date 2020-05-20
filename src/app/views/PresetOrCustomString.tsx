import React from 'react';
import ChooseOptionView from './ChooseOptionView';
import { FormatState } from '../redux/store';

export class PresetOrCustomStringView extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.label}
        <ChooseOptionView
          value={this.props.state.selected}
          onChange={this.onTypeChange}
          options={[...this.props.options.keys()]} />
        {this.props.state.selected === this.props.customOption ?
          <input type="text"
            value={this.props.state.custom}
            onChange={this.onTextChange} /> : null}
      </div>
    );
  }

  onTypeChange = (newOption: string) => {
    let newState = {
      ...this.props.state,
      selected: newOption,
    };
    if (newOption === this.props.customOption) {
      newState.value = this.props.state.custom;
    } else {
      let tmp = this.props.options.get(newOption);
      if (tmp === undefined) {
        throw new Error(`Option ${newOption} has no value mapped`);
      }
      newState.value = tmp;
    }
    this.props.onStateChange(newState);
  }

  onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newState = {
      ...this.props.state,
      value: event.target.value,
      custom: event.target.value,
    };
    this.props.onStateChange(newState);
  }
}

export interface Props {
  label?: string,
  options: Map<string, string>,
  customOption: string,
  state: FormatState,
  onStateChange: (newState: FormatState) => void,
}

export default PresetOrCustomStringView;
