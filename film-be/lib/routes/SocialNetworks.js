import { runService }  from '../expressServiceRunning';
import { staticUrl } from '../../etc/config.json';

export default {
    async auth(req, res) {
        try {
            const token = await runService('socialNetworkSessions/Create', {
                params: req.user
            });

            res.redirect(`${staticUrl}/setSession?token=${token}`);
        } catch (error) {
            console.log(error);
        }
    }
};
