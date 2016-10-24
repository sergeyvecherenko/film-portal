import { observable, action } from 'mobx';
import jwtLib                 from 'jwt-simple';
import viewStore              from './ViewStore.js';

const { beUrl } = window.MD_CONFIG;

class SessionStore {
    @observable currentUser = undefined;

    @action loginFacebook = async () => {
        window.location.href = `${beUrl}/auth/facebook`;
    }

    @action setSession = async token => {
        const currentUser = jwtLib.decode(token, '', 'isSkipAuth');

        localStorage.setItem('session', token);
        this.currentUser = currentUser;

        setTimeout(() => viewStore.setCurrentPage('films'), 0);
    }

    @action restoreSession() {
        try {
            const token = localStorage.getItem('session');
            const currentUser = jwtLib.decode(token, '', 'isSkipAuth');

            this.currentUser = currentUser;

            if (location.pathname === '/') {
                viewStore.setCurrentPage('audits');
                setTimeout(() => {
                    viewStore.isInitied = true;
                }, 300);
            }
        } catch (err) {
            if (!location.pathname.includes('setSession')) {
                viewStore.setCurrentPage('landing');
                setTimeout(() => {
                    viewStore.isInitied = true;
                }, 300);
            }
        }
    }

    @action logout() {
        localStorage.removeItem('session');
        viewStore.setCurrentPage('landing');

        this.currentUser = undefined;
    }
}

const singleton = new SessionStore();

export default singleton;
