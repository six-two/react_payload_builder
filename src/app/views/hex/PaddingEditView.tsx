import React from 'react';
import ChooseOptionView from '../ChooseOptionView';
import * as Padding from '../../hex/Padding';

export default class PaddingEditView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onPatternChange = this.onPatternChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
    }

    static get defaultValues(): Padding.Values {
        return Padding.Utils.defaultValues();
    }

    static get type(): string {
        return Padding.TYPE;
    }

    render() {
        return (
            <div>
                Repeat
                <input type="text"
                    value={this.props.values.pattern}
                    onChange={this.onPatternChange} />
                  up to index
                <input type="number" min="1"
                    value={this.props.values.paddToLength}
                    onChange={this.onNumberChange} />
            </div>);
    }

    onNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.onChange({paddToLength: event.target.value});
    }

    onPatternChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.onChange({pattern: event.target.value});
    }

    onTypeChange(newValue: string) {
        this.onChange({repeatType: newValue});
    }

    onChange(changedValues: any) {
        this.props.onChange(Object.assign({}, this.props.values, changedValues));
    }
}

export interface Props {
  values: Padding.Values,
  onChange: (newValues: Padding.Values) => void,
}