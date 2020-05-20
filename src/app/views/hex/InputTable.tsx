import React from 'react';
import HexElementView from '../hex/HexElementView';
import { AnyValues } from '../../hex/ByteStringBuilder';
import { connect } from 'react-redux';
import { ListEntry, State as ReduxState } from '../../redux/store';
import { setListEntries } from '../../redux/actions';


class InputTable_ extends React.Component<Props>{
  render() {
    return (
      <table className="list">
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
              <HexElementView
                index={index}
                key={elem.key}
                isLast={index + 1 === this.props.entries.length}
                onItemDelete={this.onItemDeleted}
                onItemsSwap={this.onItemSwapped}
                onChange={this.onItemChange}
                data={elem.data} />
            );
          })}
          <tr key={-1} className="row-buttons">
            <td colSpan={2}>
              <button onClick={this.onItemAdd}>
                Add new element
                </button>
            </td>
            <td>
              <button onClick={this.onDeleteAll}>
                Delete all
              </button>
            </td>
          </tr>
        </tbody>
      </table >
    );
  }

  onItemAdd = () => {
    var copy = this.props.entries.slice();
    var data = this.props.newItemData(copy.length);
    let entry: ListEntry = { key: this.props.nextId, data: data };
    copy.push(entry);
    this.onChange(copy, this.props.nextId + 1);
  }

  onItemChange = (index: number, newValue: AnyValues) => {
    var copy = this.props.entries.slice();
    let entry: ListEntry = { key: copy[index].key, data: newValue };
    copy[index] = entry;
    this.onChange(copy);
  }

  onItemSwapped = (indexFrom: number, indexTo: number) => {
    var copy = this.props.entries.slice();
    const tmp = copy[indexFrom];
    copy[indexFrom] = copy[indexTo];
    copy[indexTo] = tmp;
    this.onChange(copy);
  }

  onItemDeleted = (index: number) => {
    var copy = this.props.entries.slice();
    copy.splice(index, 1);
    this.onChange(copy);
  }

  onDeleteAll = () => {
    this.onChange([]);
  }

  onChange(newArray: ListEntry[], nextId?: number) {
    nextId = nextId ?? this.props.nextId;
    this.props.setListEntries(newArray, nextId);
  }
}

export interface Props {
  newItemData: (index: number) => AnyValues,
  entries: ListEntry[],
  nextId: number,
  setListEntries: (entries: ListEntry[], nextId: number) => void,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    entries: state.persistent.entries.list,
    nextId: state.persistent.entries.nextId,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setListEntries: (entries: ListEntry[], nextId: number) => dispatch(setListEntries(entries, nextId)),
  };
};

const InputTable = connect(mapStateToProps, mapDispatchToProps)(InputTable_);
export default InputTable;
