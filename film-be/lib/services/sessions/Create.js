import jwt          from 'jsonwebtoken';
import Base         from 'service-layer/Base';
import X            from 'service-layer/Exception';
import sequelize     from '../../sequelize';
import { dumpUser } from '../utils';

import { secret }   from '../../../etc/config.json';

const User = sequelize.model('User');

export default class Create extends Base {
    static validationRules = {
        data : ['required', { 'nested_object' : {
            email    : ['required', 'email'],
            password : [ 'required' ]
        } } ]
    };

    async execute(data) {
        const session = data.data;
        const existingUser = await User.findOne({ email: session.email });

        if (!existingUser || !existingUser.checkPassword(session.password)) {
            throw new X({
                code   : 'AUTHENTICATION_FAILED',
                fields : {
                    data: {
                        email    : 'INVALID',
                        password : 'INVALID'
                    }
                }
            });
        }

        if (existingUser.status === 'BLOCKED') {
            throw new X({
                code   : 'NOT_ACTIVE_USER',
                fields : {
                    data: {
                        status : 'NOT_ACTIVE_USER'
                    }
                }
            });
        }

        return {
            data : {
                jwt : jwt.sign(dumpUser(existingUser), secret)
            }
        };
    }
}
