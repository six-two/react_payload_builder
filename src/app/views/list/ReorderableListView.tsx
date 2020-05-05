import React from 'react';
import ListItemView from './ReorderableListItemView';


export default class ReorderableListView extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {entries: [], nextId: 0}; //entry: {key: int, data: object}
        this.onItemAdd = this.onItemAdd.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
        this.onItemDeleted = this.onItemDeleted.bind(this);
        this.onItemSwapped = this.onItemSwapped.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Hex builder</h2>
                <ol>
                    { this.state.entries.map((elem, index) =>
                        <li key={elem.key}>
                            <ListItemView
                                    index={index}
                                    isLast={index + 1 === this.state.entries.length}
                                    onItemDelete={this.onItemDeleted}
                                    onItemsSwap={this.onItemSwapped} >
                                {React.createElement(this.props.entryClass,
                                 {index: index, data: elem.data, onChange: this.onItemChange})}

                            </ListItemView>
                        </li>
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

    onItemAdd() {
        var copy = this.state.entries.slice();
        var data = this.props.newItemData(copy.length);
        let entry: Entry = {key: this.state.nextId, data: data};
        copy.push(entry);
        this.onChange(copy, this.state.nextId + 1);
    }

    onItemChange(index: number, newValue: Entry) {
        var copy = this.state.entries.slice();
        let entry: Entry = {key: copy[index].key, data: newValue};
        copy[index] = entry;
        this.onChange(copy, this.state.nextId);
    }

    onItemSwapped(indexFrom: number, indexTo: number) {
        var copy = this.state.entries.slice();
        const tmp = copy[indexFrom];
        copy[indexFrom] = copy[indexTo];
        copy[indexTo] = tmp;
        this.onChange(copy, this.state.nextId);
    }

    onItemDeleted(index: number) {
        var copy = this.state.entries.slice();
        copy.splice(index, 1);
        this.onChange(copy, this.state.nextId);
    }

    onChange(newArray: Entry[], nextId: number) {
        this.setState({entries: newArray, nextId: nextId});
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
