import React from 'react';
import PropTypes from 'prop-types';
import HexElementView from './HexElementView'


class HexBuilderListView extends React.Component{
    constructor(props) {
        super(props);
        this.nextId = 0
        this.state = {entries: this.props.entries}; //entry: {key: int, data: object}
        this.onItemChange = this.onItemChange.bind(this);
        this.onItemDeleted = this.onItemDeleted.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Hex builder</h2>
                <ol>
                    { this.state.entries.map((elem, index) =>
                        <li key={elem.key}>
                            <HexElementView
                                index={index}
                                data={elem.data}
                                onChange={this.onItemChange}
                                onDelete={this.onItemDeleted} />
                        </li>
                    )}
                </ol>
            </div>
        );
    }

    onItemChange(index, newValue) {
        var copy = this.state.entries.slice();
        copy[index] = {key: copy[index].key, data: newValue};
        this.nextId += 1;
        this.onChange(copy);
    }

    onItemDeleted(index) {
        var copy = this.state.entries.slice();
        copy.splice(index, 1);
        this.onChange(copy);
    }

    onChange(newArray) {
        this.setState({entries: newArray});
        this.props.onChange(newArray);
        console.log("List onChange");
    }
}

HexBuilderListView.propTypes = {
   entries: PropTypes.array.isRequired, // list of {type: string, key: int, data: object}
   onChange: PropTypes.func.isRequired,
}

export default HexBuilderListView;