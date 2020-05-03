import React from 'react';
import PropTypes from 'prop-types';
import BytesStringBuilder from './BytesStringBuilder';

class HexStringView extends React.Component {
    render() {
        return (
            <code>
                {BytesStringBuilder.getBytesStrings(this.props.blueprints).map((value, i) => {
                    const color = this.props.colors[i % this.props.colors.length]
                    return <span style={{color: color}}>{value.str}</span>;
                })}
            </code>);
    }
}

HexStringView.propTypes = {
    blueprints: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
}


export default HexStringView;