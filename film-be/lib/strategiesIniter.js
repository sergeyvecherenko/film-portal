import passport           from 'passport';
import facebookPassport   from 'passport-facebook';
import { facebook, appUrl } from '../etc/config.json';
import sequelize          from './sequelize';
import { dumpUser }       from './services/utils.js';

const User = sequelize.model('User');
const FacebookStrategy  = facebookPassport.Strategy;

class StrategiesIniter {
    init() {
        this._initFacebook();
    }

    _initFacebook() {
        passport.use(new FacebookStrategy({
            clientID:     facebook.clientId,
            clientSecret: facebook.clientSecret,
            callbackURL:  `${appUrl}/api/v1/auth/facebook/callback`,
            profileFields: ['id', 'emails', 'name']
        },

        async (token, tokenSecret, params, profile, done) => {
            const email = profile.emails[0].value;
            const name  = `${profile.name.givenName} ${profile.name.familyName}`;
            const user = await this._findOrCreateUser(email, name);

            done(null, dumpUser(user));
        }));
    }

    async _findOrCreateUser(email, name) {
        const user = await User.findOne({ where: { email } });

        if (user) return user;

        return User.create({
            email,
            name
        });
    }
}

export default new StrategiesIniter();
