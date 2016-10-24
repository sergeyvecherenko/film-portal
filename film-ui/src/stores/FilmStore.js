import { observable, action, runInAction, computed, reaction, asStructure } from 'mobx';
import { get } from '../api.js';

class FilmStore {
    constructor() {
        reaction(
            'Page change reaction',
            () => this.page,
            () => {
                if (this.timeout) clearTimeout(this.timeout);

                this.timeout = setTimeout(() => {
                    this.fetchFilms();
                }, 500);
            }
        );

        reaction(
            'Count change reaction',
            () => this.page <= this.lastPage,
            () => {
                this.page = this.lastPage;
            }
        );
    }


    @observable films = [];
    @observable allFilmsCount = 0;
    @observable isLoading = true;
    @observable page = 1;
    @observable query = asStructure({
        title: '',
        description: '',
        category: '',
        actor: '',
        language: '',
        limit: 50
    });

    @observable filters = asStructure({
        categories: [],
        actors: [],
        languages: []
    });

    @computed get offset() {
        return (this.page - 1) * this.query.limit;
    }

    @computed get lastPage() {
        return this.allFilmsCount
            ? Math.ceil(this.allFilmsCount / this.query.limit)
            : 1;
    }

    @action fetchFilterData = async() => {
        const categories = await get(
            '/categories',
            this.query
        );

        const actors = await get(
            '/actors',
            this.query
        );

        const langs = await get(
            '/languages',
            this.query
        );

        runInAction('Update state', () => {
            const categFilters = categories.map(item => item.name);
            const actFiltets = actors.map(item => `${item.firstName} ${item.secondName}`);
            const langfiltets = langs.map(item => item.name);

            this.filters.categories.replace(categFilters);
            this.filters.actors.replace(actFiltets);
            this.filters.languages.replace(langfiltets);
        });
    }

    @action fetchFilms = async () => {
        this.query.offset = this.offset;
        this.isLoading = true;

        const data = await get(
            '/films',
            this.query
        );

        runInAction('Update state', () => {
            this.films.replace(data.films);
            this.allFilmsCount = data.count;
            this.isLoading = false;
        });
    }
}

const singleton = new FilmStore();

export default singleton;
