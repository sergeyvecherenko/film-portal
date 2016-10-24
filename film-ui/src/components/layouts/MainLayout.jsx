import React, { Component, PropTypes } from 'react';
import { observer, inject, propTypes as MobxTypes }     from 'mobx-react';
import CSSModules               from 'react-css-modules';
import AppBar                   from '../widgets/MainBar.jsx';
import styles                   from './MainLayout.less';

@inject('viewStore') @observer @CSSModules(styles)
export default class MainLayout extends Component {
    static propTypes = {
        children : PropTypes.object,
        viewStore : MobxTypes.observableObject
    };

    render() {
        const { children, viewStore } = this.props;

        console.log(viewStore.isInitied);

        if (!viewStore.isInitied) {
            return null;
        }

        return (
            <div styleName='MainLayout' >
                <AppBar />
                {children}
            </div>
        );
    }
}
