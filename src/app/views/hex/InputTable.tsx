import React from 'react';
import HexElementView from '../hex/HexElementView';
import { AnyValues } from '../../hex/ByteStringBuilder';


export default class InputTable extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    let initialValues: AnyValues[] = props.initialValues ?? [];
    let initialEntries: Entry[] = initialValues.map((value, index) => {
      return { key: index, data: value };
    });
    this.state = { entries: initialEntries, nextId: initialEntries.length };
    props.onChange(initialEntries);
  }

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
          {this.state.entries.map((elem, index) => {
            return (
              <HexElementView
                index={index}
                key={elem.key}
                isLast={index + 1 === this.state.entries.length}
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
    var copy = this.state.entries.slice();
    var data = this.props.newItemData(copy.length);
    let entry: Entry = { key: this.state.nextId, data: data };
    copy.push(entry);
    this.onChange(copy, this.state.nextId + 1);
  }

  onItemChange = (index: number, newValue: AnyValues) => {
    var copy = this.state.entries.slice();
    let entry: Entry = { key: copy[index].key, data: newValue };
    copy[index] = entry;
    this.onChange(copy, this.state.nextId);
  }

  onItemSwapped = (indexFrom: number, indexTo: number) => {
    var copy = this.state.entries.slice();
    const tmp = copy[indexFrom];
    copy[indexFrom] = copy[indexTo];
    copy[indexTo] = tmp;
    this.onChange(copy);
  }

  onItemDeleted = (index: number) => {
    var copy = this.state.entries.slice();
    copy.splice(index, 1);
    this.onChange(copy);
  }

  onDeleteAll = () => {
    this.onChange([]);
  }

  onChange(newArray: Entry[], nextId?: number) {
    nextId = nextId ?? this.state.nextId;
    this.setState({ entries: newArray, nextId: nextId });
    this.props.onChange(newArray);
  }
}

export interface Props {
  entryClass: any,
  onChange: (entries: Entry[]) => void,
  newItemData: (index: number) => AnyValues,
  initialValues?: AnyValues[],
}

interface State {
  entries: Entry[],
  nextId: number,
}

export interface Entry {
  key: number,
  data: AnyValues,
}
