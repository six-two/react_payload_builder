import React from 'react';
import * as Padding from '../../hex/Padding';
import * as Common from '../../Common';

const LABELS = ["Repeat ", " up to index "];

export default class PaddingEditView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onPatternChange = this.onPatternChange.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
  }

  render() {
    return (
      <div>
        {LABELS[0]}
        <input type="text"
          value={this.props.values.pattern}
          onChange={this.onPatternChange} />
        {LABELS[1]}
        <input type="text"
          value={this.props.values.paddToLength}
          onChange={this.onNumberChange} />
      </div>);
  }

  onNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (Common.isValidRepeatCountWhileEditing(event.target.value)) {
      this.onChange({ paddToLength: event.target.value });
    }
  }

  onPatternChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.onChange({ pattern: event.target.value });
  }

  onChange(changedValues: any) {
    this.props.onChange(Object.assign({}, this.props.values, changedValues));
  }
}

export interface Props {
  values: Padding.Values,
  onChange: (newValues: Padding.Values) => void,
}
