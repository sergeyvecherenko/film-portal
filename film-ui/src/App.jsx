import React, { Component, PropTypes }         from 'react';

export default class App extends Component {
    static propTypes = {
        children  : PropTypes.object
    };

    render() {
        const { children } = this.props;

        return (
            <div className='MP' style={{ height: '100%', width: '100%' }}>
                { children }
            </div>
        );
    }
}
