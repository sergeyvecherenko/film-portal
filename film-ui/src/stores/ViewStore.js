import { observable, action, computed, reaction } from 'mobx';
import { browserHistory }              from 'react-router';
import filmStore                      from './FilmStore';

class ViewStore {
    constructor() {
        reaction(
            'CurrentPath change reaction',
            () => this.currentPath,
            currentPath => {
                if (currentPath && currentPath !== location.pathname) {
                    browserHistory.push(currentPath);
                }
            }
        );

        reaction(
            'CurrentPage change reaction',
            () => this.currentPage,
            async currentPage => {
                switch (currentPage) {
                    case 'films':
                        filmStore.fetchFilms();
                        break;
                    default:
                        break;
                }
            }
        );
    }

    @observable currentPage = undefined;

    @computed get currentPath() {
        switch (this.currentPage) {
            case 'landing':
                return '/';
            case 'films':
                return '/films';
            default:
                return undefined;
        }
    }

    @action setCurrentPage(page) {
        this.currentPage = page;
    }
}

const singleton = new ViewStore();

export default singleton;
