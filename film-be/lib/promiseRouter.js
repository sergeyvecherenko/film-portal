import methods        from 'methods';
import promiseWrapper from './promiseWrapper';

export default function promiseRouter(Router) {
    /* eslint new-cap:0 */
    const router = Router();

    methods.forEach(method => {
        router[`${method}Async`] = function asyncFuncion() {
            for (const i in arguments) {
                if (i !== '0') arguments[i] = promiseWrapper(arguments[i]);
            }

            return router[method](...arguments);
        };
    });

    return router;
}
