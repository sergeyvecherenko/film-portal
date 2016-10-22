import { makeServiceRunner }  from '../expressServiceRunning';

export default {
    list : makeServiceRunner('categories/List', req => req.query)
};
