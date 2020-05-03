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
        this.state.entries[index].data = newValue;
        this.onChange();
    }

    onItemDeleted(index) {
        this.state.entries.splice(index, 1);
        this.onChange();
    }

    onChange() {
        this.props.onChange(this.state.entries);
        console.log("List onChange");
    }
}

HexBuilderListView.propTypes = {
   entries: PropTypes.array.isRequired, // list of {type: string, key: int, data: object}
   onChange: PropTypes.func.isRequired,
}

export default HexBuilderListView;