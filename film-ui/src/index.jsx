import '../dist/static/config.js';
import 'babel-polyfill';
import 'whatwg-fetch';
import './assets/normalize.css';

import React                                    from 'react';
import { render, unmountComponentAtNode }       from 'react-dom';
import { AppContainer }                         from 'react-hot-loader';
import injectTapEventPlugin                     from 'react-tap-event-plugin';
import MainContainer                            from './MainContainer.jsx';

const MOUNT_NODE = document.getElementById('root');

function renderApp() {
    injectTapEventPlugin();

    render(
        <AppContainer>
            <MainContainer />
        </AppContainer>,
        MOUNT_NODE
    );
}

function renderError(error) {
    const RedBox = require('redbox-react').default;

    render(<RedBox error={error} />, MOUNT_NODE);
}

function renderWithHandler() {
    const NextApp = require('./MainContainer').default;

    try {
        render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            MOUNT_NODE
        );
    } catch (error) {
        renderError(error);
    }
}

if (module.hot) {
    module.hot.accept('./MainContainer', () => {
        setTimeout(() => {
            unmountComponentAtNode(MOUNT_NODE);
            renderWithHandler();
        });
    });
}

renderApp();
