import React from 'react';
import InputTableRow from './InputTableRow';
import { AnyValues } from '../../hex/ByteStringBuilder';
import { connect } from 'react-redux';
import { ListEntry, State as ReduxState } from '../../redux/store';
import {
  listItemAdd, listItemDelete, listItemSwap,  listItemDeleteAll, listItemChanged
} from '../../redux/actions';


class InputTable_ extends React.Component<Props>{
  render() {
    return (
      <table className="input-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Configuration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.entries.map((elem, index) => {
            return (
              <InputTableRow
                index={index}
                key={elem.key}
                isLast={index + 1 === this.props.entries.length}
                onItemDelete={this.props.deleteListItem}
                onItemsSwap={this.props.swapListItems}
                onChange={this.props.updateItem}
                data={elem.data} />
            );
          })}
          <tr key={-1} className="row-buttons">
            <td colSpan={2}>
              <button onClick={this.props.addListItem}>
                Add new element
                </button>
            </td>
            <td>
              <button onClick={this.props.deleteAllListItems}>
                Delete all
              </button>
            </td>
          </tr>
        </tbody>
      </table >
    );
  }
}

export interface Props {
  entries: ListEntry[],
  addListItem: () => void,
  swapListItems: (indexA: number, indexB: number) => void,
  deleteListItem: (index: number) => void,
  deleteAllListItems: () => void,
  updateItem: (index: number, newValue: AnyValues) => void,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    entries: state.persistent.entries.list,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addListItem: () => dispatch(listItemAdd()),
    swapListItems: (indexA: number, indexB: number) => dispatch(listItemSwap(indexA, indexB)),
    deleteListItem: (index: number) => dispatch(listItemDelete(index)),
    deleteAllListItems: () => dispatch(listItemDeleteAll()),
    updateItem: (index: number, newValue: AnyValues) => dispatch(listItemChanged(index, newValue)),
  };
};

const InputTable = connect(mapStateToProps, mapDispatchToProps)(InputTable_);
export default InputTable;
