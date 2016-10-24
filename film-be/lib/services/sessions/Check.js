import { promisify } from 'bluebird';
import jwt           from 'jsonwebtoken';
import moment        from 'moment';
import Base          from 'service-layer/Base';
import X             from 'service-layer/Exception';
import sequelize     from '../../sequelize';
import { secret }    from '../../../etc/config.json';

const User = sequelize.model('User');

const jwtVerify = promisify(jwt.verify);

export default class Check extends Base {
    static validationRules = {
        token : [ 'required' ]
    };

    async execute({ token }) {
        try {
            const userData = await jwtVerify(token, secret);
            const isValid = await User.findOne({ _id: userData.id, status: 'ACTIVE' });

            if (!isValid) {
                throw new X({
                    code   : 'WRONG_TOKEN',
                    fields : {
                        token : 'WRONG_TOKEN'
                    }
                });
            }

            console.log(userData.email, moment(Date.now()).format('MMMM Do YYYY, HH:mm:ss'), '+3h');

            return jwtVerify(token, secret);
        } catch (error) {
            throw new X({
                code   : 'WRONG_TOKEN',
                fields : {
                    token : 'WRONG_TOKEN'
                }
            });
        }
    }
}
