import React from 'react';
import { TaggedByteString, Blueprint, ByteStringBuilder } from '../../hex/ByteStringBuilder';
import CopyButton from '../CopyButton';
import * as FormatChooser from "../PresetOrCustomString";


const CUSTOM_FORMAT = "custom";
const DEFAULT_FORMAT = "raw";
const FORMAT_MAP = new Map<string, string>();
FORMAT_MAP.set("python", "python -c 'print(\"%s\")'");
FORMAT_MAP.set("printf", "printf '%s'");
FORMAT_MAP.set(DEFAULT_FORMAT, "%s");
FORMAT_MAP.set(CUSTOM_FORMAT, "your_command --flags '%s'")

function escapeOutputString(unescaped: string): string {
  // escape quote signs since they could mess up passing the payload to a program (eg printf)
  return unescaped.replace(/'/g, "\\x27").replace(/"/g, "\\x22")
    // escape spaces, since the html does not handle consecutive whitespaces well
    .replace(/ /g, "\\x20");
}

export default class OutputView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const default_format_value = FORMAT_MAP.get(DEFAULT_FORMAT) ?? "%s";
    this.state = {
      format: { option: DEFAULT_FORMAT, value: default_format_value }
    };
  }

  render() {
    var error;
    const parts = this.state.format.value.split("%s");
    if (parts.length !== 2) {
      error = 'Format has to contain exactly one "%s" (without the quotes)';
    }

    let escapedTaggedStrings: TaggedString[] = [];//to make the type check happy
    let result = ByteStringBuilder.getBytesStrings(this.props.blueprints);
    if (result.errorMessage) {
      error = result.errorMessage
    } else {
      escapedTaggedStrings = result.byteStrings.map((bs: TaggedByteString) => {
        let taggedStr: TaggedString = {
          key: bs.key,
          str: escapeOutputString(bs.data.str),
        };
        return taggedStr;
      });
    }
    let textToCopy = escapedTaggedStrings.map((tbs) => { return tbs.str }).join("");
    textToCopy = parts[0] + textToCopy + parts[1];

    return (
      <div>
        {"Output format: "}
        <FormatChooser.PresetOrCustomStringView options={FORMAT_MAP}
          values={this.state.format}
          customOption={CUSTOM_FORMAT}
          onChange={this.onFormatChange} />
        <br />
        {error ?
          <span className="err-msg">{error}</span> :
          <div className="byteOutput">
            <CopyButton text={textToCopy} />
            <br />
            {parts[0]}
            <span>
              {escapedTaggedStrings.map((value: TaggedString) => {
                return <span className="multi-colored" key={value.key}>{value.str}</span>;
              })}
            </span>
            {parts[1]}
          </div>
        }
      </div>
    );
  }

  onFormatChange = (newFormat: FormatChooser.Values) => {
    this.setState({ format: newFormat });
  }
}

interface Props {
  blueprints: Blueprint[],
}

interface State {
  format: FormatChooser.Values,
}

interface TaggedString {
  str: string,
  key: number,
}
