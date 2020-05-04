import React from 'react';
import PropTypes from 'prop-types';

class ListItemView extends React.Component {
    constructor(props) {
        super(props);
        this.onMoveUp = this.onMoveUp.bind(this);
        this.onMoveDown = this.onMoveDown.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    render() {
        return (
            <div>
                {this.props.children}
                <div>
                    <input type="button"
                        value="Up"
                        onClick={this.onMoveUp}
                        disabled={this.props.index === 0} />
                    <input type="button"
                        value="Down"
                        onClick={this.onMoveDown}
                        disabled={this.props.isLast} />
                    <input type="button"
                        value="Delete"
                        onClick={this.onDelete} />
                </div>
            </div>);
    }

    onMoveUp() {
        if (this.props.index > 0){
            this.props.onItemsSwap(this.props.index, this.props.index - 1);
        }
    }

    onMoveDown() {
        if (!this.props.isLast){
            this.props.onItemsSwap(this.props.index, this.props.index + 1);
        }
    }

    onDelete() {
        this.props.onItemDelete(this.props.index);
    }
}

ListItemView.propTypes = {
    index: PropTypes.number.isRequired,
    isLast: PropTypes.bool.isRequired,
    onItemsSwap: PropTypes.func.isRequired,//f(srcIndex, dstIndex)
    onItemDelete: PropTypes.func.isRequired,//f(index)
};

export default ListItemView;