import { makeServiceRunner }  from '../expressServiceRunning';

export default {
    list : makeServiceRunner('languages/List', req => req.query)
};
