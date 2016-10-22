import React, { Component, PropTypes } from 'react';

import CSSModules               from 'react-css-modules';
import AppBar                   from '../widgets/MainBar.jsx';
import styles                   from './MainLayout.less';

@CSSModules(styles)
export default class MainLayout extends Component {
    static propTypes = {
        children : PropTypes.object
    };

    render() {
        const { children } = this.props;

        return (
            <div styleName='MainLayout' >
                <AppBar />
                {children}
            </div>
        );
    }
}
