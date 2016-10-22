import React, { Component }     from 'react';
import { Router, browserHistory }   from 'react-router';
import { Provider }                 from 'mobx-react';
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';
import routes                       from './routes.jsx';
import stores                       from './stores';

export default class MainContainer extends Component {
    render() {
        return (
            <Provider {...stores}>
                <MuiThemeProvider>
                    <Router history={browserHistory} children={routes} />
                </MuiThemeProvider>
            </Provider>
        );
    }
}
