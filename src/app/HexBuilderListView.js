import React from 'react';
import PropTypes from 'prop-types';
import HexElementView from './HexElementView';
import Padding from './hextypes/Padding';
import ListItemView from './ListItemView';


class HexBuilderListView extends React.Component{
    constructor(props) {
        super(props);
        this.nextId = 0
        this.state = {entries: []};//this.props.entries}; //entry: {key: int, data: object}
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
                                <HexElementView
                                    index={index}
                                    data={elem.data}
                                    onChange={this.onItemChange} />
                            </ListItemView>
                        </li>
                    )}
                    <li>
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
        var data = Padding.defaultValues;
        data.number = this.nextId + 1;// makes them easier to differentiate for testing
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
        console.log("List onChange");
    }
}

HexBuilderListView.propTypes = {
   entries: PropTypes.array.isRequired, // list of {type: string, key: int, data: object}
   onChange: PropTypes.func.isRequired,
}

export default HexBuilderListView;