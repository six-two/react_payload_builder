import React from 'react';
// import ListItemView from './ReorderableListItemView';
import HexElementView from '../hex/HexElementView';


export default class ReorderableListView extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { entries: [], nextId: 0 };
  }

  render() {
    return (
      <div>
        <h2>Hex builder</h2>
        <table className="list">
          <tr>
            <th>Type</th>
            <th>Configuration</th>
            <th>Actions</th>
          </tr>
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
          }
          )}
          <tr key={-1}>
          <td/><td>
            <input type="button" style={{width: "100%"}}
              value="Add new element"
              onClick={this.onItemAdd} />
              </td><td/>
          </tr>
        </table>
      </div>
    );
  }

  onItemAdd = () => {
    var copy = this.state.entries.slice();
    var data = this.props.newItemData(copy.length);
    let entry: Entry = { key: this.state.nextId, data: data };
    copy.push(entry);
    this.onChange(copy, this.state.nextId + 1);
  }

  onItemChange = (index: number, newValue: Entry) => {
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
    this.onChange(copy, this.state.nextId);
  }

  onItemDeleted = (index: number) => {
    var copy = this.state.entries.slice();
    copy.splice(index, 1);
    this.onChange(copy, this.state.nextId);
  }

  onChange(newArray: Entry[], nextId: number) {
    this.setState({ entries: newArray, nextId: nextId });
    this.props.onChange(newArray);
  }
}

interface Props {
  entryClass: any,
  onChange: (entries: Entry[]) => void,
  newItemData: (index: number) => any,
}

interface State {
  entries: Entry[],
  nextId: number,
}

interface Entry {
  key: number,
  data: any,
}
