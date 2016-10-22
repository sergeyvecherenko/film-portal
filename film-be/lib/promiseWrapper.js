import Exception from 'service-layer/Exception';

export default route => {
    return async (req, res, next) => {
        try {
            const data = await route(req, res, () => 'next');

            if (data === 'next') return next();

            data.status = 1;

            return res.send(data);
        } catch (error) {
            if (error instanceof Exception) {
                res.send({
                    status : 0,
                    error  : error.toHash()
                });
            } else {
                console.error('REQUEST URL ', req.url);
                console.error('REQUEST PARAMS: ', req.params);
                console.error('REQUEST BODY: ', req.body);
                console.error('ERROR: ', error.stack);
                console.error('-------------------');

                res.send({
                    status : 0,
                    error  : {
                        code    : 'UNKNOWN_ERROR',
                        message : 'Please, contact your system administartor!'
                    }
                });
            }
        }
    };
};
