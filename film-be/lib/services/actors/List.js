import Base         from 'service-layer/Base';
import sequelize    from '../../sequelize';
import { dumpActors } from '../utils';

const Actor = sequelize.model('actor');

export default class List extends Base {
    async execute() {
        const actors = await Actor.findAll();

        return {
            data: actors.map(actor => dumpActors(actor.get({ plain: true })))
        };
    }
}
