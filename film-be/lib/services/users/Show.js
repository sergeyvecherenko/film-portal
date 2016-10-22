import Base         from 'service-layer/Base';
import { dumpUser } from '../utils';
import sequelize    from '../../sequelize';

const User = sequelize.model('User');

export default class List extends Base {
    static validationRules = {
        id : ['required', 'object_id']
    };

    async execute(data) {
        const user = await User.findById(data.id);

        return { data: dumpUser(user) };
    }
}
