import React from 'react';
import ChooseOptionView from './ChooseOptionView';


export class PresetOrCustomStringView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...props.initialState };
  }

  render() {
    return (
      <div>
        {this.props.label}
        <ChooseOptionView
          value={this.props.values.option}
          onChange={this.onTypeChange}
          options={[...this.props.options.keys()]} />
        {this.state.selectedOption === this.props.customOption ?
          <input type="text"
            value={this.props.values.value}
            onChange={this.onValueChange} /> : null}
      </div>
    );
  }

  onTypeChange = (newOption: string) => {
    let value;
    if (newOption === this.props.customOption) {
      value = this.state.customValue;
    } else {
      value = this.props.options.get(newOption);
      if (value === undefined) {
        throw new Error(`Option ${newOption} has no value mapped`);
      }
    }
    this.changeState({ selectedOption: newOption });
    this.onValueChange(newCustomValue);
  }

  onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newCustomValue = event.target.value;
    this.changeState({ customValue: newCustomValue });
    this.onValueChange(newCustomValue);
  }

  changeState(changes: any) {
    let newState = { ...this.state, ...changes };
    this.setState(newState);
    if (this.props.onStateChange) {
      this.props.onStateChange(newState);
    }
  }
}

export interface Props {
  label?: string,
  options: Map<string, string>,
  customOption: string,
  initialState: State,
  onValueChange: (newValue: string) => void,
  onStateChange?: (newState: State) => void,
}

export interface State {
  customValue: string,
  selectedOption: string,
}

export default PresetOrCustomStringView;
