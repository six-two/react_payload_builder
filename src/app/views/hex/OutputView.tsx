import React from 'react';
import ChooseOptionView from '../ChooseOptionView';
import { TaggedByteString, Blueprint, ByteStringBuilder } from '../../hex/BytesStringBuilder';
import CopyButton from '../CopyButton';


const PYTHON_FORMAT = "python";
const PRINTF_FORMAT = "printf";
const RAW_FORMAT = "raw";
const CUSTOM_FORMAT = "custom";
const FORMATS = [RAW_FORMAT, PYTHON_FORMAT, PRINTF_FORMAT, CUSTOM_FORMAT];
const FORMAT_MAP = new Map<string, string>();
FORMAT_MAP.set(PYTHON_FORMAT, "python -c 'print(\"%s\")'");
FORMAT_MAP.set(PRINTF_FORMAT, "printf '%s'");
FORMAT_MAP.set(RAW_FORMAT, "%s");

function escapeOutputString(unescaped: string): string {
  // escape quote signs since they could mess up passing the payload to a program (eg printf)
  return unescaped.replace(/'/g, "\\x27").replace(/"/g, "\\x22")
    // escape spaces, since the html does not handle consecutive whitespaces well
    .replace(/ /g, "\\x20");
}

export default class OutputView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { outputFormat: RAW_FORMAT, customFormat: "your_command --flags '%s'" };
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  render() {
    var error;
    var format: string | undefined = this.state.outputFormat === CUSTOM_FORMAT ? this.state.customFormat :
      FORMAT_MAP.get(this.state.outputFormat);
    if (!format) {
      throw Error(`Unknown format type: '${this.state.outputFormat}'`);
    }
    const parts = format.split("%s");
    if (parts.length !== 2) {
      error = 'Format has to contain exactly one "%s" (without the quotes)';
    }

    let escapedTaggedStrings: TaggedString[] = [];//to make the type check happy
    try {
      let byteStrings = ByteStringBuilder.getBytesStrings(this.props.blueprints);
      escapedTaggedStrings = byteStrings.map((bs: TaggedByteString) => {
        let taggedStr: TaggedString = {
          key: bs.key,
          str: escapeOutputString(bs.data.str),
        };
        return taggedStr;
      })
    } catch (e) {
      return (
        <div className="error-message" style={{ backgroundColor: "red" }}>
          <p>An error occured while creating the output</p>
          {e.name + ": " + e.message}
        </div>
      );
    }
    let textToCopy = escapedTaggedStrings.map((tbs) => { return tbs.str }).join("");
    textToCopy = parts[0] + textToCopy + parts[1];

    const coloredByteString = escapedTaggedStrings.map(
      (value: TaggedString, i: number) => {
        const color: string = this.props.colors[i % this.props.colors.length];
        return <span className="multi-colored" key={value.key}>{value.str}</span>;
      });

    const customFormatTextField = this.state.outputFormat === CUSTOM_FORMAT ?
      <input type="text"
        value={this.state.customFormat}
        onChange={this.onValueChange} /> : null;

    return (
      <div>
        {"Output format: "}
        <ChooseOptionView
          value={this.state.outputFormat}
          onChange={this.onTypeChange}
          options={FORMATS} />
        {customFormatTextField}
        <br />
        {error ?
          <span className="err-msg">{error}</span> :
          <div  className="byteOutput">
            <CopyButton text={textToCopy} />
            <br />
            {parts[0]}
            <span>
              {coloredByteString}
            </span>
            {parts[1]}
          </div>
        }
      </div>
    );
  }

  onTypeChange(newValue: string) {
    this.setState({ outputFormat: newValue });
  }

  onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ customFormat: event.target.value });
  }
}

interface Props {
  colors: string[],
  blueprints: Blueprint[],
}

interface State {
  outputFormat: string,
  customFormat: string,
}

interface TaggedString {
  str: string,
  key: number,
}
