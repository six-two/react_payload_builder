import React from 'react';
import { connect } from 'react-redux';
import PresetOrCustomStringView from "../PresetOrCustomString";
import { FormatState, ParsedFormat, State as ReduxState } from '../../redux/store';
import { setFormat } from '../../redux/actions';


const CUSTOM_FORMAT = "custom";
const DEFAULT_FORMAT = "raw";
const FORMAT_MAP = new Map<string, string>();
FORMAT_MAP.set(DEFAULT_FORMAT, "%x");
FORMAT_MAP.set("hexdump", "%h");
FORMAT_MAP.set("URL escaped", "%u");
FORMAT_MAP.set("python", "python -c 'print(\"%x\")'");
FORMAT_MAP.set("printf", "printf '%x'");
FORMAT_MAP.set(CUSTOM_FORMAT, "You should never see this message! %x")

export const DEFAULT_FORMAT_STATE: FormatState = {
  selected: DEFAULT_FORMAT,
  value: FORMAT_MAP.get(DEFAULT_FORMAT) || "Default format value not found! %x",
  custom: "yourCommand --flags '%x'",
}

const INSERT_HERE_REGEX = /%[xuh]/g;
const ERROR_MESSAGE = 'Format has to contain exactly one "%x" (\\x?? escape), "%u" (%?? escape) or "%h" (hexdump view)'


export function parseFormatString(formatString: string): ParsedFormat {
  const labels = formatString.split(INSERT_HERE_REGEX);
  if (labels.length !== 2) {
    return { errorMessage: ERROR_MESSAGE, format: "", labels: [] };
  }
  const formatStart = labels[0].length;
  const formatEnd = formatString.length - (labels[1].length);
  const format = formatString.slice(formatStart, formatEnd);
  return { format: format, labels: labels };
}

class FormatChooser_ extends React.Component<Props> {
  render() {
    return <div className="format-chooser">
      <PresetOrCustomStringView options={FORMAT_MAP}
        state={this.props.format}
        customOption={CUSTOM_FORMAT}
        onStateChange={this.props.setFormat}
        label="Output format: " />
    </div>
  }
}

export interface Props {
  format: FormatState,
  setFormat: (format: FormatState) => void,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    format: state.persistent.format,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setFormat: (format: FormatState) => dispatch(setFormat(format)),
  };
};

const FormatChooser = connect(mapStateToProps, mapDispatchToProps)(FormatChooser_);
export default FormatChooser;
