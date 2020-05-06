import React from 'react';
import ChooseOptionView from '../ChooseOptionView';
import Padding from './PaddingEditView';
import Integer from './IntegerEditView';
import String from './StringEditView';
import * as Int from '../../hex/Integer';
import * as Pad from '../../hex/Padding';
import * as Str from '../../hex/String';

var TYPES = [Int.TYPE, Str.TYPE, Str.TYPE_REVERSED, Pad.TYPE];
const TYPE_MAP = new Map<string, TypeInfos>();
TYPE_MAP.set(Pad.TYPE, { defaultValues: Pad.Utils.defaultValues, viewClass: Padding });
TYPE_MAP.set(Int.TYPE, { defaultValues: Int.Utils.defaultValues, viewClass: Integer });
TYPE_MAP.set(Str.TYPE, { defaultValues: Str.Utils.defaultValues, viewClass: String });
TYPE_MAP.set(Str.TYPE_REVERSED, { defaultValues: Str.ReversedUtils.defaultValues, viewClass: String });


export default class HexElementView extends React.Component<HexElementViewProps, HexElementViewProps> {
  constructor(props: HexElementViewProps) {
    super(props);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onChildChange = this.onChildChange.bind(this);
  }

  render() {
    return (
      <div className="editListView">
        {"Type: "}
        <ChooseOptionView value={this.props.data.type} options={TYPES} onChange={this.onTypeChange} />

        {this.renderChild(this.props.data.type)}
      </div>
    );
  }

  onTypeChange(newType: string) {
    this.onChange(newType, this.defaultValues(newType));
  }

  onChildChange(newValues: any) {
    this.onChange(this.props.data.type, newValues);
  }

  onChange(newType: string, newValues: any) {
    const newData = Object.assign(newValues, { type: newType });
    this.props.onChange(this.props.index, newData);
  }

  renderChild(type: string): any {
    return React.createElement(this.typeToClass(type), {
      onChange: this.onChildChange,
      values: this.props.data,
    });
  }

  defaultValues(type: string): any {
    let ret = TYPE_MAP.get(type)?.defaultValues;
    if (!ret) {
      throw Error(`Unknown type: ${type}`);
    }
    return ret();
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
