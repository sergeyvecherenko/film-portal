import sessionStore from '../stores/SessionStore';

export function statusCheck(data) {
    if (!data.status) {
        if (data.error.code === 'WRONG_TOKEN') {
            sessionStore.logout();
        }

        throw data.error;
    } else {
        return data.data;
    }
}
