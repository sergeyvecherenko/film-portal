import jwt          from 'jsonwebtoken';
import Base         from 'service-layer/Base';
import { dumpUser } from '../utils';
import { secret } from '../../../etc/config.json';

export default class Create extends Base {
    static validationRules = {
        email: [ 'required' ],
        id: ['required', 'positive_integer'],
        name: [ { 'max_length': 250 } ]
    };

    async execute(data) {
        return jwt.sign(dumpUser(data), secret);
    }
}
