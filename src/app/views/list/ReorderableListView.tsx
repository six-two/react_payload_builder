import React from 'react';
import ListItemView from './ReorderableListItemView';


export default class ReorderableListView extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { entries: [], nextId: 0 };
  }

  render() {
    return (
      <div>
        <h2>Hex builder</h2>
        <ol className="list">
          {this.state.entries.map((elem, index) => {
            const childProps = { index: index, data: elem.data, onChange: this.onItemChange };
            return (
              <ListItemView
                index={index}
                key={elem.key}
                isLast={index + 1 === this.state.entries.length}
                onItemDelete={this.onItemDeleted}
                onItemsSwap={this.onItemSwapped} >

                {React.createElement(this.props.entryClass, childProps)}
              </ListItemView>
            );
          }
          )}
          <li key={-1}>
            <input type="button"
              value="Add new element"
              onClick={this.onItemAdd} />
          </li>
        </ol>
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
