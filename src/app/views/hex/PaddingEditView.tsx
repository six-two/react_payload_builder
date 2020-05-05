import React from 'react';
import ChooseOptionView from '../ChooseOptionView'

const REPEAT_N = "Repeat N times"
const REPEAT_TO = "Repeat up to index"

class PaddingEditView extends React.Component<PaddingProps> {
    constructor(props: PaddingProps) {
        super(props);
        this.onPatternChange = this.onPatternChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
    }

    static get defaultValues(): PaddingValues {
        return {
           pattern: "A",
           repeatType: REPEAT_N,
           number: 1,
           type: PaddingEditView.type,
       };
    }

    static get type(): string {
        return "Padding"
    }

    render() {
        return (
            <div>
                <input type="text"
                    value={this.props.values.pattern}
                    onChange={this.onPatternChange} />
                <ChooseOptionView
                    value={this.props.values.repeatType}
                    onChange={this.onTypeChange}
                    options={[REPEAT_N, REPEAT_TO]} />
                <input type="number" min="1"
                    value={this.props.values.number}
                    onChange={this.onNumberChange} />
            </div>);
    }

    onNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.onChange({number: event.target.value});
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

interface PaddingValues {
  number: number,
  pattern: string,
  repeatType: string,
  type: string,
}

interface PaddingProps {
  values: PaddingValues,
  onChange: (newValues: PaddingValues) => void,
}

export {REPEAT_N, REPEAT_TO};
export default PaddingEditView;
