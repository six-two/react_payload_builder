import React from 'react';
import Checkbox from 'rc-checkbox';
import { TaggedByteString, Blueprint, ByteStringBuilder } from '../../hex/ByteStringBuilder';
import CopyButton from '../CopyButton';
import * as FormatChooser from "../PresetOrCustomString";


const CUSTOM_FORMAT = "custom";
const DEFAULT_FORMAT = "raw";
const EXPORT_FORMAT = "export this session";
const FORMAT_MAP = new Map<string, string>();
FORMAT_MAP.set("python", "python -c 'print(\"%s\")'");
FORMAT_MAP.set("printf", "printf '%s'");
FORMAT_MAP.set(DEFAULT_FORMAT, "%s");
FORMAT_MAP.set(CUSTOM_FORMAT, "your_command --flags '%s'")
FORMAT_MAP.set(EXPORT_FORMAT, "This text should not be visible! %s");

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
      format: { option: DEFAULT_FORMAT, value: default_format_value },
      isLittleEndian: true,
    };
  }

  render() {
    let renderData: RenderData = this.getRenderData();

    return (
      <div>
        <label>
          <Checkbox
            checked={this.state.isLittleEndian}
            onChange={this.onEndianChange}
          />
          use little endian
        </label>
        <FormatChooser.PresetOrCustomStringView options={FORMAT_MAP}
          values={this.state.format}
          customOption={CUSTOM_FORMAT}
          onChange={this.onFormatChange}
          label="Output format: " />
        <br />
        {renderData.error ?
          <span className="err-msg">{renderData.error}</span> :
          <div className="byteOutput">
            {renderData.textToCopy ? <CopyButton text={renderData.textToCopy} /> : null}
            <br />
            {renderData.dom}
          </div>
        }
      </div>
    );
  }

  getRenderData(): RenderData {
    const parts = this.state.format.value.split("%s");
    if (parts.length !== 2) {
      return {
        error: 'Format has to contain exactly one "%s" (without the quotes)',
        dom: null, textToCopy: null
      };
    } else if (this.state.format.option === EXPORT_FORMAT) {
      return this.exportRenderData();
    } else {
      return this.normalRenderData(parts);
    }
  }

  exportRenderData(): RenderData {
    const state: any[] = this.props.blueprints.map((x) => x.data);
    let stateString: string = JSON.stringify(state);
    stateString = btoa(stateString);  //base64 encode the json

    // take the current url and set the import param to our current state
    const urlBuilder = new URL(window.location.href);
    urlBuilder.searchParams.set("import", stateString);
    const url = urlBuilder.href;

    const dom = <span>
      You can return to the current state anytime by visiting:<br /><br />
      {url}
    </span>;
    return { dom: dom, textToCopy: url };
  }

  normalRenderData(labels: string[]): RenderData {
    let result = new ByteStringBuilder(this.state.isLittleEndian)
      .getBytesStrings(this.props.blueprints);
    if (result.errorMessage) {
      return { error: result.errorMessage, dom: null, textToCopy: null };
    }
    let escapedTaggedStrings = result.byteStrings.map((bs: TaggedByteString) => {
      let taggedStr: TaggedString = {
        key: bs.key,
        str: escapeOutputString(bs.data.toString()),
      };
      return taggedStr;
    });

    let textToCopy = escapedTaggedStrings.map((tbs) => { return tbs.str }).join("");
    textToCopy = labels[0] + textToCopy + labels[1];

    let dom = <span>
      {labels[0]}
      {escapedTaggedStrings.map((value: TaggedString) => {
        return <span className="multi-colored" key={value.key}>
          {value.str}
        </span>;
      })}
      {labels[1]}
    </span>;

    return { dom: dom, textToCopy: textToCopy };
  }

  onFormatChange = (newFormat: FormatChooser.Values) => {
    this.setState({ format: newFormat });
  }

  onEndianChange = (event: any) => {
    this.setState({ isLittleEndian: event.target.checked });
  }
}

interface RenderData {
  error?: string,
  dom: any,
  textToCopy: string | null,
}

interface Props {
  blueprints: Blueprint[],
}

interface State {
  format: FormatChooser.Values,
  isLittleEndian: boolean,
}

interface TaggedString {
  str: string,
  key: number,
}
