export function updateObjectKeys(oldObject, newObjject) {
    /* eslint no-param-reassign: 0 */

    for (const key in newObjject) {
        if (oldObject.hasOwnProperty(key)) {
            oldObject[key] = newObjject[key];
        }
    }
}
