import React from 'react';
import * as Str from '../../hex/String';

const LABELS_NORMAL = ["Repeat ", " exactly ", " time(s)"];
const LABELS_REVERSED = ["Reverse ", " and repeat it ", " time(s)"];

export default class StringEditView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onPatternChange = this.onPatternChange.bind(this);
    this.onNumberChange = this.onNumberChange.bind(this);
  }

  render() {
    const labels = this.props.values.type === Str.TYPE_REVERSED ?
      LABELS_REVERSED : LABELS_NORMAL;
    return (
      <div>
        {labels[0]}
        <input type="text"
          value={this.props.values.pattern}
          onChange={this.onPatternChange} />
        {labels[1]}
        <input type="number" min="1"
          value={this.props.values.repeatCount}
          onChange={this.onNumberChange} />
        {labels[2]}
      </div>);
  }

  onNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.onChange({ repeatCount: event.target.value });
  }

  onPatternChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.onChange({ pattern: event.target.value });
  }

  onChange(changedValues: any) {
    this.props.onChange(Object.assign({}, this.props.values, changedValues));
  }
}

export interface Props {
  values: Str.Values,
  onChange: (newValues: Str.Values) => void,
}
