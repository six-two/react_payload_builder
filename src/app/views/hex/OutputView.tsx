import React from 'react';
import Checkbox from 'rc-checkbox';
import { connect } from 'react-redux';
import { TaggedByteString, Blueprint, ByteStringBuilder } from '../../hex/ByteStringBuilder';
import CopyButton from '../CopyButton';
import * as FormatChooser from "../PresetOrCustomString";
import * as Esc from '../../hex/Escaper';
import { State as ReduxState } from '../../redux/store';
import { toggleEndian } from '../../redux/actions';


const CUSTOM_FORMAT = "custom";
const DEFAULT_FORMAT = "raw";
const EXPORT_FORMAT = "export this session";
const URL_FORMAT = "URL escaped";
const FORMAT_MAP = new Map<string, string>();
FORMAT_MAP.set("python", "python -c 'print(\"%s\")'");
FORMAT_MAP.set("printf", "printf '%s'");
FORMAT_MAP.set(DEFAULT_FORMAT, "%s");
FORMAT_MAP.set(CUSTOM_FORMAT, "You should never see this message!")
FORMAT_MAP.set(URL_FORMAT, "%s");//same as raw, but using url escaping
FORMAT_MAP.set(EXPORT_FORMAT, "EXPORT");


export interface ExportableState {
  selectedFormat: string,
  customFormatValue: string,
  isLittleEndian: boolean,
}

//TODO split into more components
class OutputView_ extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const default_format_value = FORMAT_MAP.get(DEFAULT_FORMAT) ?? "%s";
    this.state = {
      isLittleEndian: true,
      format: "%s",
    };
  }

  render() {
    let renderData: RenderData = this.getRenderData();
    let usesIntegers = false;
    for (let i = 0; i < this.props.blueprints.length; i++) {
      if (this.props.blueprints[i].data.type === "Integer") {
        usesIntegers = true;
      }
    }

    return (
      <div className="byteOutput">
        <table className="output_settings">
          <tbody>
            <tr>
              <td>
                <FormatChooser.PresetOrCustomStringView options={FORMAT_MAP}
                  initialState={{ selectedOption: "raw", customValue: "your command here: '%s'" }}
                  customOption={CUSTOM_FORMAT}
                  onValueChange={this.onFormatChange}
                  label="Output format: " />
              </td>
              {usesIntegers ?
                <td>
                  <label>
                    <Checkbox
                      checked={this.props.isLittleEndian}
                      onChange={this.props.toggleEndian}
                    />
                    use little endian
                  </label>
                </td>
                : null
              }
              {renderData.textToCopy ? <td><CopyButton text={renderData.textToCopy} /></td> : null}
            </tr>
          </tbody>
        </table>
        {renderData.error ?
          <span className="err-msg">{renderData.error}</span> :
          renderData.dom
        }
      </div>
    );
  }

  getRenderData(): RenderData {
    const parts = this.state.format.split("%s");
    if (parts.length !== 2) {
      return {
        error: 'Format has to contain exactly one "%s" (without the quotes)',
        dom: null, textToCopy: null
      };
    } else if (this.state.format === "EXPORT") {//TODO fix
      return this.exportRenderData();
    } else {
      return this.normalRenderData(parts);
    }
  }

  exportRenderData(): RenderData {
    const state = this.props.blueprints.map((x) => x.data);
    let stateString: string = JSON.stringify(state);
    stateString = Esc.uriSafeEncode(stateString);

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
      // const escapeFunction = this.state.format.option === URL_FORMAT ?
      // Esc.urlEscapeByte : Esc.printfEscapeByte;
      const escapeFunction = Esc.printfEscapeByte;

      let taggedStr: TaggedString = {
        key: bs.key,
        str: Esc.escapeBytes(bs.data, escapeFunction).toString(),
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

  onFormatChange = (newFormat: string) => {
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

export interface Props {
  blueprints: Blueprint[],
  toggleEndian: () => void,
  isLittleEndian: boolean,
}

interface State {
  format: string,
  isLittleEndian: boolean,
}

interface TaggedString {
  str: string,
  key: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isLittleEndian: state.isLittleEndian,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleEndian: () => dispatch(toggleEndian()),
  };
};

const OutputView = connect(mapStateToProps, mapDispatchToProps)(OutputView_);
export default OutputView;
