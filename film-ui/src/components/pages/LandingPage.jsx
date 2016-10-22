import React, { Component }     from 'react';
import { inject, propTypes as MobxTypes } from 'mobx-react';
import RaisedButton             from 'material-ui/RaisedButton';
import FontIcon                 from 'material-ui/FontIcon';

import CSSModules               from 'react-css-modules';
import styles                   from './LandingPage.less';

@inject('sessionStore') @CSSModules(styles)
export default class LandingPage extends Component {
    static propTypes = {
        sessionStore: MobxTypes.observableObject
    };

    handleLogin() {
        const { sessionStore } = this.props;

        sessionStore.loginFacebook();
    }

    render() {
        return (
            <div styleName='LandingPage'>
                <div styleName='form'>
                    <span styleName='mainText'>Film Portal</span>
                    <div styleName='actions'>
                        <RaisedButton
                            className='LoginButton'
                            label='Login with Facebook'
                            primary
                            icon={<FontIcon className='muidocs-icon-custom-github' />}
                        >
                            <a
                                styleName='link'
                                onClick={::this.handleLogin}
                                name='facebook'
                                target='_blank'
                            />
                        </RaisedButton>
                    </div>
                </div>
            </div>
        );
    }
}
