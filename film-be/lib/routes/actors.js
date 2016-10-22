import { makeServiceRunner }  from '../expressServiceRunning';

export default {
    list : makeServiceRunner('actors/List', req => req.query)
};
