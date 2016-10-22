import bluebird      from 'bluebird';
import express       from 'express';
import session       from 'express-session';
import passport      from 'passport';
import cors          from 'cors';
import bodyParser    from 'body-parser';
import routesInit    from './lib/routes';
import promiseRouter from './lib/promiseRouter';
import strategiesIniter    from './lib/strategiesIniter.js';
import { appPort, secret } from './etc/config.json';

global.Promise = bluebird;

strategiesIniter.init();

const routes = routesInit();
const app    = express();
const router = promiseRouter(express.Router);
const checkSession = routes.sessions.check;
const socialNetworksSession = session({ secret, resave: false, saveUninitialized: true });

console.log('APP START SUCCEFULL ON PORT ', appPort);

app.use(cors({ origin: '*' }));

app.use(bodyParser.json({ limit  : 1024 * 1024,
    verify : (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.send({
                status : 0,
                error  : {
                    code    : 'BROKEN_JSON',
                    message : 'Please, verify your json'
                }
            });
        }
    }
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(appPort);

app.use('/api/v1', router);

function setRedirect(req, res, next) {
    if (req.query.redirectTo) req.session.redirectTo = req.query.redirectTo;

    next();
}

router.get('/auth/facebook', socialNetworksSession, setRedirect, passport.authenticate('facebook', { scope: [ 'email' ] }));
router.get('/auth/facebook/callback', socialNetworksSession, (req, res, next) => {
    passport.authenticate('facebook', (err, user) => {
        req.user = user;
        next();
    })(req, res);
}, routes.socialNetworks.auth.bind(routes.socialNetworks));

router.getAsync('/films',      routes.films.list);
router.getAsync('/categories', routes.categories.list);
router.getAsync('/actors',     routes.actors.list);
router.getAsync('/languages',  routes.languages.list);

export default app;
