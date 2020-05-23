import React from 'react';
import Checkbox from 'rc-checkbox';
import { connect } from 'react-redux';
import { ListEntry, State as ReduxState } from '../../redux/store';
import { toggleEndian } from '../../redux/actions';


class EndianToggleView_ extends React.Component<Props> {
  render() {
    if (!this.isVisible()) {
      return null;
    }

    return (
      <div className="endian-toggle">
        <label>
          <Checkbox
            className="cell"
            checked={this.props.isLittleEndian}
            onChange={this.props.toggleEndian}
          />
          {"use little endian"}
        </label>
      </div>
    );
  }

  isVisible(): boolean {
    for (let i = 0; i < this.props.blueprints.length; i++) {
      if (this.props.blueprints[i].data.type === "Integer") {
        // Only show if at least one element is of type Integer
        return true;
      }
    }
    return false;
  }
}

export interface Props {
  blueprints: ListEntry[],
  isLittleEndian: boolean,
  toggleEndian: () => void,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isLittleEndian: state.persistent.isLittleEndian,
    blueprints: state.persistent.entries.list,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleEndian: () => dispatch(toggleEndian()),
  };
};

const EndianToggleView = connect(mapStateToProps, mapDispatchToProps)(EndianToggleView_);
export default EndianToggleView;
