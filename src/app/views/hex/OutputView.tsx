import React from 'react';
import Checkbox from 'rc-checkbox';
import { connect } from 'react-redux';
import { TaggedByteString, ByteStringBuilder } from '../../hex/ByteStringBuilder';
import CopyButton from '../CopyButton';
import * as FormatChooser from "../PresetOrCustomString";
import * as Esc from '../../hex/Escaper';
import { ListEntry, FormatState, State as ReduxState } from '../../redux/store';
import { toggleEndian, setFormat } from '../../redux/actions';
import ExportUriView from './ExportUriView';
import ColoredHexStringView from './ColoredHexStringView';
import ClipbordManager from '../../ClipboardManager';



const CUSTOM_FORMAT = "custom";
const DEFAULT_FORMAT = "raw";
const EXPORT_FORMAT = "export this session";
const URL_FORMAT = "URL escaped";
const FORMAT_MAP = new Map<string, string>();
FORMAT_MAP.set("python", "python -c 'print(\"%s\")'");
FORMAT_MAP.set("printf", "printf '%s'");
FORMAT_MAP.set(DEFAULT_FORMAT, "%s");
FORMAT_MAP.set(CUSTOM_FORMAT, "You should never see this message! %s")
FORMAT_MAP.set(URL_FORMAT, "%s");//same as raw, but using url escaping
FORMAT_MAP.set(EXPORT_FORMAT, "You should never see this message! %s");


//TODO split into more components
class OutputView_ extends React.Component<Props> {
  render() {
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
                  state={this.props.format}
                  customOption={CUSTOM_FORMAT}
                  onStateChange={this.props.setFormat}
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
              {ClipbordManager.canCopy() ? <td><CopyButton /></td> : null}
            </tr>
          </tbody>
        </table>
        {this.props.format.selected === EXPORT_FORMAT ?
          <ExportUriView /> :
          <ColoredHexStringView />
        }
      </div>
    );
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
  blueprints: ListEntry[],
  isLittleEndian: boolean,
  format: FormatState,
  toggleEndian: () => void,
  setFormat: (format: FormatState) => void,
}

interface TaggedString {
  str: string,
  key: number,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isLittleEndian: state.persistent.isLittleEndian,
    blueprints: state.persistent.entries.list,
    format: state.persistent.format,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleEndian: () => dispatch(toggleEndian()),
    setFormat: (format: FormatState) => dispatch(setFormat(format)),
  };
};

const OutputView = connect(mapStateToProps, mapDispatchToProps)(OutputView_);
export default OutputView;
