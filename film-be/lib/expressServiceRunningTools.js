function cloneDeep(data) {
    return JSON.parse(JSON.stringify(data));
}

export default function (services) {
    async function runService(actionName, { session, params = {} }) {
        const [actionGroup, actionClass] = actionName.split('/');
        const context = cloneDeep(session && session.context ? session.context : {});

        try {
            const result = await new services[actionGroup][actionClass]({
                context
            }).run(params);

            return result;
        } catch (error) {
            throw error;
        }
    }

    function makeServiceRunner(actionName, paramsCollector) {
        return function serviceRunner(req, res) {
            const params = paramsCollector ? paramsCollector(req, res) : {};

            return runService(actionName, {
                params,
                session: req.session
            });
        };
    }

    return {
        makeServiceRunner,
        runService
    };
}
