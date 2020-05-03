import React from 'react';
import PropTypes from 'prop-types';
import HexBuilderStore from './HexBuilderStore'
import HexElementView from './HexElementView'


class HexBuilderListView extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
        <h2>Hex builder</h2>
        {this.props.store.elements.map((elem, index) =>
        <HexElementView store={this.props.store} index={index} key={elem.key} data={elem.inner} />)}
        </div>
    }
}

HexBuilderListView.propTypes = {
                           store: PropTypes.instanceOf(HexBuilderStore)
                       }

export default HexBuilderListView;