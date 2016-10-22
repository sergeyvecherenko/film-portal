import Base         from 'service-layer/Base';
import sequelize    from '../../sequelize';
import { dumpFilm } from '../utils';

const Film = sequelize.model('film');

export default class List extends Base {
    static validationRules = {
        limit:       [ 'positive_integer' ],
        offset:      [ { 'min_number': 0 } ],
        title:       [ 'string' ],
        description: [ 'string' ],
        category:    [ 'string' ],
        actor:       [ 'string' ],
        language:    [ 'string' ]
    };

    async execute(params) {
        const data = await this._find(params);

        return {
            data: {
                films: data.films,
                count: data.count
            }
        };
    }

    async _find(params) {
        const query = {
            include: [ { all: true } ],
            where: {}
        };

        const limit = +params.limit;
        const offset = +params.offset;

        const title = params.title;
        const description = params.description;
        const category = params.category;
        const actor = params.actor;
        const language = params.language;

        if (title) query.where.title = { $like: `%${title}%` };
        if (description) query.where.description = { $like: `%${description}%` };

        const rawfilms = await Film.findAll(query);
        let films = rawfilms.map(film => dumpFilm(film.get({ plain: true })));

        if (category) {
            films = films.filter(film => film.category.toLowerCase().includes(category.toLowerCase()));
        }

        if (actor) {
            films = films.filter(film => {
                if (!film.actorNames) return false;

                return this.actorSearch(film, actor);
            });
        }
        if (language) {
            films = films.filter(film => film.language.toLowerCase().includes(language.toLowerCase()));
        }

        const count = films.length;

        return {
            films: films.splice(offset, offset + limit),
            count
        };
    }

    actorSearch(film, actor) {
        return film.actorNames.find(item => {
            return item.firstName.toLowerCase().includes(actor.toLowerCase())
                || item.secondName.toLowerCase().includes(actor.toLowerCase())
                || (`${item.firstName} ${item.secondName}`).toLowerCase() === actor.toLowerCase();
        });
    }
}
