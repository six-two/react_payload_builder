import React from 'react';
import ChooseOptionView from './ChooseOptionView';


export class PresetOrCustomStringView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let customFormat = props.options.get(props.customOption);
    if (customFormat === undefined) {
      throw new Error("Initial value for customOption is not suppplied");
    }

    this.state = { lastCustomValue: customFormat };
  }

  render() {
    return (
      <div>
        <ChooseOptionView
          value={this.props.values.option}
          onChange={this.onTypeChange}
          options={[...this.props.options.keys()]} />
        {this.isCustom() ?
          <input type="text"
            value={this.props.values.value}
            onChange={this.onValueChange} /> : null}
      </div>
    );
  }

  isCustom(option: string | undefined = undefined): boolean {
    option = option ?? this.props.values.option;
    return option === this.props.customOption;
  }

  onTypeChange = (newType: string) => {
    if (newType === this.props.values.option) {
      return; //no type change
    }
    let value;
    if (this.isCustom(newType)) {
      // preset -> custom
      // load last used custom value
      value = this.state.lastCustomValue;
    }
    else {
      if (this.isCustom()) {
        // custom -> preset
        // store current custom value for the future
        this.setState({ lastCustomValue: this.props.values.value });
      }
      value = this.props.options.get(newType);
      if (value === undefined) {
        throw new Error("[BUG] Type has no value mapped"); //should never happen
      }
    }
    const values: Values = { option: newType, value: value };
    this.props.onChange(values);
  }

  onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.isCustom()) {//should be true
      const values: Values = {
        option: this.props.values.option,
        value: event.target.value,
      };
      this.props.onChange(values);
    }
  }
}

export interface Props {
  options: Map<string, string>,
  customOption: string,
  values: Values,
  onChange: (newValues: Values) => void,
}

interface State {
  lastCustomValue: string,//changing this has no effect on the rendering of the component
}

export interface Values {
  option: string,
  value: string,
}

export default PresetOrCustomStringView;
