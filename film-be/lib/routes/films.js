import { makeServiceRunner }  from '../expressServiceRunning';

export default {
    list : makeServiceRunner('films/List', req => req.query)
};
