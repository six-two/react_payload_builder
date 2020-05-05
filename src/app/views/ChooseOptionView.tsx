import React from 'react';

export class ChooseOptionView extends React.Component<ChooseOptionViewProps, {}> {
    static defaultValue(): string {
        return "";
    }

    render() {
        return (<select onChange={(event) => {this.props.onChange(event.target.value)}} value={this.props.value}>
             <option value="" key={-1} disabled hidden>
                {this.props.prompt ? this.props.prompt : "Choose a option"}
             </option>
             {this.props.options.map((value: any, i: number) => {
                // Here using key=index should be ok, since the order should not change
                return <option value={value} key={i}>{value}</option>;
             })}
         </select>);
    }
}

export interface ChooseOptionViewProps {
    prompt?: string,
    value: string,
    options: string[],
    onChange: (newValue: string) => void,
}

export default ChooseOptionView;
