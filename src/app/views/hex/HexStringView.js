import React from 'react';
import PropTypes from 'prop-types';
import BytesStringBuilder from '../../BytesStringBuilder';

class HexStringView extends React.Component {
    render() {
        try {
            return (
                <div style={{backgroundColor: "gray", textAlign: "center", margin: "25px"}}>
                    {BytesStringBuilder.getBytesStrings(this.props.blueprints).map((value, i) => {
                        const color = this.props.colors[i % this.props.colors.length];
                        //TODO use a real key?
                        return <span style={{color: color}} key={i}>{value.str}</span>;
                    })}
                </div>
            );
        } catch (e) {
            return (
                <div className="error-message" style={{backgroundColor: "red"}}>
                    <p>An error occured while creating the output</p>
                    {e.name+": "+e.message}
                </div>
            );
        }
    }
}

HexStringView.propTypes = {
    blueprints: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
}


export default HexStringView;