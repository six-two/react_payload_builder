import React from 'react';
import { connect } from 'react-redux';
import { BuilderResult } from '../../hex/ByteStringBuilder';
import * as Esc from '../../hex/Escaper';
import { State as ReduxState } from '../../redux/store';
import { centerString, range, toHex } from '../../Common';


function splitOfBeginning(text: string[], length: number): [string[], string[]] {
  if (text.length <= length) {
    return [text, []];
  } else {
    return [text.slice(0, length), text.slice(length)];
  }
}

class ColoredHexDumpView_ extends React.Component<Props> {
  render() {
    if (this.props.hasErrors) {
      return null;
    }

    let bytesPerRow = this.props.bytesPerRow ?? 0x10;
    let showOffset = this.props.showOffset ?? true;
    let showAscii = this.props.showAscii ?? true;
    let colorCount = 3;

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

    function renderRow(offset: any, hex: any, ascii: any, extraClass: string = ""): any {
      return <div className={`row${extraClass}`} key={`row-${offset}`}>
        {showOffset ? <div className="cell offset"><span>{offset}</span></div> : undefined}
        <div className="cell hex">{hex}</div>
        {showAscii ? <div className="cell ascii">{ascii}</div> : undefined}
      </div>
    }

    let createRow = function(row: Row, index: number): any {
      let offset = toHex(index * bytesPerRow, 4);
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
        let key = `hd-${index}-${i}`;
        hex.push(<span key={key} className={colorClass}>{hexString}</span>);
        ascii.push(<span key={key} className={colorClass}>{asciiString}</span>)
      }
      return renderRow(offset, hex, ascii);
    }

    let headerRow;
    if (showOffset) {
      let offsets = range(0, bytesPerRow).map(i => toHex(i, 2)).join(" ");
      headerRow = renderRow("",
        <span>{offsets}</span>,
        <span>{centerString(" ASCII ", bytesPerRow, "=")}</span>,
        " header-row");
    }

    return <div className="hexdump">
      {headerRow}
      {rows.map(createRow)}
    </div>;
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
  hasErrors: boolean,
}


const mapStateToProps = (state: ReduxState, ownProps: any): Props => {
  return {
    ...ownProps,
    builderResult: state.outputBuilderResult,
    hasErrors: state.hasErrors,
  };
};

const ColoredHexDumpView = connect(mapStateToProps)(ColoredHexDumpView_);
export default ColoredHexDumpView;
