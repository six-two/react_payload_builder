import React from 'react';
import ChooseOptionView from '../ChooseOptionView';

const INT_8 = "8 bit";
const INT_16 = "16 bit";
const INT_32 = "32 bit";
const INT_64 = "64 bit";
const INT_SIZES = [INT_8, INT_16, INT_32, INT_64];
const MAX_INT_MAP = new Map<string, bigint>();
MAX_INT_MAP.set(INT_8, 0xffn);
MAX_INT_MAP.set(INT_16, 0xffffn);
MAX_INT_MAP.set(INT_32, 0xffffffffn);
MAX_INT_MAP.set(INT_64, 0xffffffffffffffffn);


export default class HexIntegerView extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }

    static get defaultValues(): Values {
        return {
           numberString: "0x41414141",
           numberType: INT_32,
           type: HexIntegerView.type,
       };
    }

    static get type(): string {
        return "Integer"
    }

    render() {
        return (
            <div>
                <ChooseOptionView
                    value={this.props.values.numberType}
                    onChange={this.onTypeChange}
                    options={INT_SIZES} />
                <input type="text"
                    value={this.props.values.numberString}
                    onChange={this.onValueChange} />
                {this.renderErrorMessages()}
            </div>
        );
    }

    onTypeChange(newValue: string) {
        this.onChange(newValue, this.props.values.numberString)
    }

    onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.onChange(this.props.values.numberType, event.target.value);
    }

    onChange(numberType: string, numberString: string) {
        this.props.onChange({numberType: numberType, numberString: numberString, type: HexIntegerView.type});
    }

    static parseNumber(string: string): bigint {
        // Remove characters that can be used to make strings more human readable
        string = string.replace(/[\s_]+/g, "");
        return BigInt(string);
    }

    renderErrorMessages(): any {
        var error: string = "";
        try {
            var num: bigint = HexIntegerView.parseNumber(this.props.values.numberString);
            const type: string = this.props.values.numberType;
            let maxOrNull = MAX_INT_MAP.get(type);
            if (!maxOrNull) {
              throw new Error(`Unknown number type: ${type}`);
            }else{
              let max: bigint = maxOrNull;
              if (num > max){
                  error = `Number to big for '${type}'`;
              }
              if (num < 0n) {
                  const min: bigint = (max + 1n) / BigInt(-2);
                  if (num < min) {
                      error = `Number to big for '${type}'`;
                  }
              }
            }
        } catch (e) {
            error = "Parsing integer failed";
        }
        if (error) {
            return <span style={{color: "red"}}>Error: {error}</span>
        }
    }
}

interface Values {
  numberString: string,
  numberType: string,
  type: string,
}

interface Props {
  values: Values,
  onChange: (newValues: Values) => void,
}
