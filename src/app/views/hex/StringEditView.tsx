import React from 'react';
import * as Str from '../../hex/String';
import * as Common from '../../Common';

const LABELS_NORMAL = ["Repeat ", " exactly ", " time(s)"];
const LABELS_REVERSED = ["Reverse ", " and repeat it ", " time(s)"];

export default class StringEditView extends React.Component<Props> {
  render() {
    const labels = this.props.values.type === Str.TYPE_REVERSED ?
      LABELS_REVERSED : LABELS_NORMAL;
    return (
      <div className="edit-container">
        {labels[0]}
        <input className="input-string" type="text"
          value={this.props.values.pattern}
          onChange={this.onPatternChange} />
        {labels[1]}
        <input className="input-count" type="text"
          value={this.props.values.repeatCount}
          onChange={this.onNumberChange} />
        {labels[2]}
      </div>);
  }

  onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Common.isValidRepeatCountWhileEditing(event.target.value)) {
      this.onChange({ repeatCount: event.target.value });
    }
  }

  onPatternChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
