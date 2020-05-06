import React from 'react';

export default class ListItemView extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.onMoveUp = this.onMoveUp.bind(this);
    this.onMoveDown = this.onMoveDown.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    return (
      <li className="list-item multi-colored">
        {this.props.children}
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
        </div>
      </li>);
  }

  onMoveUp() {
    if (this.props.index > 0) {
      this.props.onItemsSwap(this.props.index, this.props.index - 1);
    }
  }

  onMoveDown() {
    if (!this.props.isLast) {
      this.props.onItemsSwap(this.props.index, this.props.index + 1);
    }
  }

  onDelete() {
    this.props.onItemDelete(this.props.index);
  }
}

interface Props {
  children: any,
  index: number,
  isLast: boolean,
  onItemsSwap: (srcIndex: number, dstIndex: number) => void,
  onItemDelete: (index: number) => void,
}
