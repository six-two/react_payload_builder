import React from 'react';
import ChooseOptionView from '../ChooseOptionView'
import Padding from './PaddingEditView'
import Integer from './IntegerEditView'

var TYPES = [Padding.type, Integer.type]

class HexElementView extends React.Component<HexElementViewProps, HexElementViewProps> {
    constructor(props: HexElementViewProps) {
        super(props);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onChildChange = this.onChildChange.bind(this);
    }

    render() {
        return (
            <div>
                <label>Type:</label>
                <ChooseOptionView value={this.props.data.type} options={TYPES} onChange={this.onTypeChange}/>

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
         const newData = Object.assign(newValues, {type: newType});
         this.props.onChange(this.props.index, newData);
    }

    renderChild(type: string): any {
      return React.createElement(this.typeToClass(type), {
        onChange: this.onChildChange,
        values: this.props.data,
      });
    }

    defaultValues(type: string): any {
        return this.typeToClass(type).defaultValues;
    }

    typeToClass(type: string): any {
        switch (type) {
            case Padding.type:
                return Padding;
            case Integer.type:
                return Integer;
            default:
                throw Error(`Unknown type: ${type}`);
        }
    }
};

interface HexElementViewProps {
  onChange: (index: number, newValue: any) => void,
  index: number,
  data: any,
}

// HexElementView.propTypes = {
//    onChange: PropTypes.func.isRequired,//f(index)
//    index: PropTypes.number.isRequired,//wil be used to identify this object
//    data: PropTypes.object.isRequired,//{type: "Padding", pattern: string, repeatType: string, number: int}
// };

export default HexElementView;
