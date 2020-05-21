import React from 'react';

export class ItemControls extends React.Component<Props, {}> {
  render() {
    let upClassName = this.props.index === 0 ? "disabled-button" : undefined;
    let downClassName = this.props.isLast ? "disabled-button" : undefined;
    return (
      <div className="list-item-controls">
        <button
          className={upClassName}
          onClick={this.onMoveUp}
          disabled={this.props.index === 0} >
          <i className="fa fa-arrow-up" aria-hidden="true" />
        </button>

        <button
          className={downClassName}
          value="Down"
          onClick={this.onMoveDown}
          disabled={this.props.isLast} >
          <i className="fa fa-arrow-down" aria-hidden="true" />
        </button>
        <button
          value="Delete"
          onClick={this.onDelete} >
          <i className="fa fa-trash" aria-hidden="true" />
        </button>
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

export default ItemControls;
