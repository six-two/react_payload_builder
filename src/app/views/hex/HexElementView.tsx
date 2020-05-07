import React from 'react';
import ChooseOptionView from '../ChooseOptionView';
import Padding from './PaddingEditView';
import Integer from './IntegerEditView';
import String from './StringEditView';
import * as Int from '../../hex/Integer';
import * as Pad from '../../hex/Padding';
import * as Str from '../../hex/String';

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
      <div className="editListView">
        {"Type: "}
        <ChooseOptionView value={this.props.data.type} options={TYPES}
          onChange={this.onTypeChange} />

        {this.renderChild(this.props.data.type)}
      </div>
    );
  }

  onTypeChange = (newType: string) => {
    this.onChange(newType, getTypeInfo(newType).defaultValues());
  }

  onChildChange = (newValues: any) => {
    this.onChange(this.props.data.type, newValues);
  }

  onChange(newType: string, newValues: any) {
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
  onChange: (index: number, newValue: any) => void,
  index: number,
  data: any,
}

interface TypeInfos {
  defaultValues: any,
  viewClass: any,
}
