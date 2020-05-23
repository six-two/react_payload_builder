import React from 'react';
import { connect } from 'react-redux';
import { BuilderResult } from '../../hex/ByteStringBuilder';
import * as Esc from '../../hex/Escaper';
import { State as ReduxState } from '../../redux/store';
import ClipboardManager from '../../ClipboardManager';


function splitOfBeginning(text: string[], length: number): [string[], string[]] {
  if (text.length <= length) {
    return [text, []];
  } else {
    return [text.slice(0, length), text.slice(length)];
  }
}

class ColoredHexDumpView_ extends React.Component<Props> {
  render() {
    // ClipboardManager.setTextToCopy(null);//TODO bug: Delayed by one
    // Possible Solution: fire noop event when copy button hiding state changes

    let bytesPerRow = this.props.bytesPerRow ?? 0x10;
    let showOffset = this.props.showOffset ?? true;
    let showAscii = this.props.showAscii ?? true;
    let colorCount = 3;

    //TODO move upstream
    if (this.props.builderResult.errorMessage) {
      return this.renderErrorMessage(this.props.builderResult.errorMessage);
    }

    let rows: Row[] = [];
    let missingInRow = 0;

    // split the bytes into rows
    for (let i = 0; i < this.props.builderResult.byteStrings.length; i++) {
      let bytes = this.props.builderResult.byteStrings[i].data.bytes;

      while (bytes.length > 0) {
        if (missingInRow <= 0) {
          rows.push({ items: [] });
          missingInRow = bytesPerRow;
        }
        let toAdd;
        [toAdd, bytes] = splitOfBeginning(bytes, missingInRow);
        rows[rows.length - 1].items.push({ bytes: toAdd, color: i % colorCount });
        missingInRow -= toAdd.length;
      }
    }

    let renderRow = function(row: Row, index: number): any {
      let offset = (index * bytesPerRow).toString(16).toUpperCase().padStart(4, "0");
      let hex = [];
      let ascii = [];
      for (let i = 0; i < row.items.length; i++) {
        let item = row.items[i];
        let colorClass = `color-${item.color + 1}`;
        let hexString = item.bytes.map(Esc.byteToHex).join(" ");
        if (i !== row.items.length - 1) {
          hexString += " ";
        }
        let asciiString = item.bytes.map(Esc.toHexdumpChar).join("");
        asciiString = asciiString.replace(/ /g, "\u00a0");//html safe spaces
        let key=`hd-${index}-${i}`;
        hex.push(<span key={key} className={colorClass}>{hexString}</span>);
        ascii.push(<span key={key} className={colorClass}>{asciiString}</span>)
      }
      return (<div className="row" key={`row-${index}`}>
        {showOffset ? <span className="cell offset">{offset}</span> : undefined}
        <span className="cell hex">{hex}</span>
        {showAscii ? <span className="cell ascii">{ascii}</span> : undefined}
      </div>);
    }

    let headerRow;
    if (showOffset) {
      let offsets = [];
      for (let i = 0; i < bytesPerRow; i++) {
        offsets.push(i.toString(16).toUpperCase().padStart(2, "0"));
      }
      headerRow = <div className="row" key="headerRow">
        {showOffset ? <span className="cell offset">Offset</span> : undefined}
        <span className="cell hex">{offsets.join(" ")}</span>
        {showAscii ? <span className="cell ascii">ASCII</span> : undefined}
      </div>;
    }

    return <div className="hexdump">
      {headerRow}
      {rows.map(renderRow)}
    </div>;
  }

  renderErrorMessage(text: string) {
    ClipboardManager.setTextToCopy(null);
    return <span className="err-msg">
      {text}
    </span>
  }
}

interface Row {
  items: RowItem[],
}

interface RowItem {
  color: number,
  bytes: string[],
}

export interface Props {
  builderResult: BuilderResult,
  bytesPerRow?: number,
  showOffset?: boolean,
  showAscii?: boolean,
}


const mapStateToProps = (state: ReduxState, ownProps: any): Props => {
  return {
    ...ownProps,
    isLittleEndian: state.persistent.isLittleEndian,
    builderResult: state.outputBuilderResult,
    formatString: state.persistent.format.value,
  };
};

const ColoredHexDumpView = connect(mapStateToProps)(ColoredHexDumpView_);
export default ColoredHexDumpView;
