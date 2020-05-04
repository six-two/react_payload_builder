import React from 'react';
import PropTypes from 'prop-types';
import ListItemView from './ReorderableListItemView';


class ReorderableListView extends React.Component{
    constructor(props) {
        super(props);
        this.nextId = 0
        this.state = {entries: []}; //entry: {key: int, data: object}
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
                                 {index: index, data: elem.data, onChange: this.onItemChange}, [])}

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
        copy.push({key: this.nextId, data: data});
        this.nextId += 1;
        this.onChange(copy);
    }

    onItemChange(index, newValue) {
        var copy = this.state.entries.slice();
        copy[index] = {key: copy[index].key, data: newValue};
        this.onChange(copy);
    }

    onItemSwapped(indexFrom, indexTo) {
        var copy = this.state.entries.slice();
        const tmp = copy[indexFrom];
        copy[indexFrom] = copy[indexTo];
        copy[indexTo] = tmp;
        this.onChange(copy);
    }

    onItemDeleted(index) {
        var copy = this.state.entries.slice();
        copy.splice(index, 1);
        this.onChange(copy);
    }

    onChange(newArray) {
        this.setState({entries: newArray});
        var onlyData = newArray.map((item) => item.data);
        this.props.onChange(onlyData);
    }
}

ReorderableListView.propTypes = {
   onChange: PropTypes.func.isRequired,
   entryClass: PropTypes.elementType.isRequired,
   newItemData: PropTypes.func.isRequired,//f(index) -> object
}

export default ReorderableListView;