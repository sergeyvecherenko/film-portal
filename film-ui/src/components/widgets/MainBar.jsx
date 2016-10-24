import React, { Component }              from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import IconButton    from 'material-ui/IconButton';
import IconMenu      from 'material-ui/IconMenu';
import MenuItem      from 'material-ui/MenuItem';
import MoreVertIcon  from 'material-ui/svg-icons/navigation/more-vert';

import CSSModules               from 'react-css-modules';
import styles                   from './MainBar.less';

@inject('sessionStore', 'viewStore', 'filmStore')
@observer @CSSModules(styles, { allowMultiple: true })
export default class MainBar extends Component {
    static propTypes = {
        sessionStore : MobxTypes.observableObject,
        viewStore : MobxTypes.observableObject,
        filmStore : MobxTypes.observableObject
    };

    handleLogoutClick = () => {
        const { sessionStore } = this.props;

        sessionStore.logout();
    }

    render() {
        const { currentUser } = this.props.sessionStore;

        return (
            <div styleName='MainBar' >
                <div>
                    <div>
                        {currentUser && currentUser.name}
                    </div>
                    <div>
                        {currentUser && currentUser.email}
                    </div>
                </div>
                <IconMenu
                    iconStyle={{ color: 'white' }}
                    iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem primaryText='Logout' onTouchTap={this.handleLogoutClick} />
                </IconMenu>
            </div>
        );
    }
}
