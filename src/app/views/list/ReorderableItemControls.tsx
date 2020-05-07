import React from 'react';

export class ListItemControls extends React.Component<Props, {}> {
  render() {
    return (
        <div className="list-item-controls">
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
        </div>);
  }

  onMoveUp = () => {
    if (this.props.index > 0) {
      this.props.onItemsSwap(this.props.index, this.props.index - 1);
    }
  }

  onMoveDown = () => {
    if (!this.props.isLast) {
      this.props.onItemsSwap(this.props.index, this.props.index + 1);
    }
  }

  onDelete = () => {
    this.props.onItemDelete(this.props.index);
  }
}

interface Props {
  index: number,
  isLast: boolean,
  onItemsSwap: (srcIndex: number, dstIndex: number) => void,
  onItemDelete: (index: number) => void,
}

export default ListItemControls;
