import React from 'react';
import ChooseOptionView from '../ChooseOptionView';
import Padding from './PaddingEditView';
import Integer from './IntegerEditView';
import String from './StringEditView';
import ReorderableItemControls from '../list/ReorderableItemControls';
import * as Int from '../../hex/Integer';
import * as Pad from '../../hex/Padding';
import * as Str from '../../hex/String';
import {AnyValues} from '../../hex/ByteStringBuilder';

const TYPE_MAP = new Map<string, TypeInfos>();
TYPE_MAP.set(Int.TYPE, { defaultValues: Int.Utils.defaultValues, viewClass: Integer });
TYPE_MAP.set(Str.TYPE, { defaultValues: Str.Utils.defaultValues, viewClass: String });
TYPE_MAP.set(Str.TYPE_REVERSED, { defaultValues: Str.ReversedUtils.defaultValues, viewClass: String });
TYPE_MAP.set(Pad.TYPE, { defaultValues: Pad.Utils.defaultValues, viewClass: Padding });
const TYPES = [...TYPE_MAP.keys()];

function getTypeInfo(type: string): TypeInfos {
  let ret = TYPE_MAP.get(type);
  if (!ret) {
    throw Error(`Unknown type: ${type}`);
  }
  return ret;
}

export default class HexElementView extends React.Component<HexElementViewProps, HexElementViewProps> {
  render() {
    return (
      <tr className="list-item multi-colored">
        <td>
          <ChooseOptionView value={this.props.data.type} options={TYPES}
            onChange={this.onTypeChange} />
        </td>
        <td>
          {this.renderChild(this.props.data.type)}
        </td>
        <td>
          <ReorderableItemControls
            index={this.props.index}
            isLast={this.props.isLast}
            onItemsSwap={this.props.onItemsSwap}
            onItemDelete={this.props.onItemDelete} />
        </td>
      </tr>
    );
  }

  onTypeChange = (newType: string) => {
    this.onChange(newType, getTypeInfo(newType).defaultValues());
  }

  onChildChange = (newValues: AnyValues) => {
    this.onChange(this.props.data.type, newValues);
  }

  onChange(newType: string, newValues: AnyValues) {
    const newData = Object.assign(newValues, { type: newType });
    this.props.onChange(this.props.index, newData);
  }

  renderChild(type: string): any {
    const viewClass = getTypeInfo(type).viewClass;
    const props = {
      onChange: this.onChildChange,
      values: this.props.data,
    };
    return React.createElement(viewClass, props);
  }

  typeToClass(type: string): any {
    let ret = TYPE_MAP.get(type)?.viewClass;
    if (!ret) {
      throw Error(`Unknown type: ${type}`);
    }
    return ret;
  }
};

interface HexElementViewProps {
  index: number,
  data: AnyValues,
  isLast: boolean,
  onItemsSwap: (srcIndex: number, dstIndex: number) => void,
  onItemDelete: (index: number) => void,
  onChange: (index: number, newValue: AnyValues) => void,
}

interface TypeInfos {
  defaultValues: () => AnyValues,
  viewClass: any,
}
