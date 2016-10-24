export function getErrorText(errorCode, options) {
    switch (errorCode) {
        case 'REQUIRED':
            return 'Field can\'t be blank';
        case 'INVALID':
            return 'Field not valid';
        case 'WRONG_EMAIL':
            return 'Failed to recognize the e-mail address';
        case 'TOO_LONG':
            return `Field value too long, maximum ${options.max} symbol`;
        case 'NOT_SECURE_PASSWORD':
            return 'Must be at least eight characters,' +
            'contain one small, one big letter and one number and no specials characters';
        case 'EMAIL_NOT_FOUND':
            return 'Can\'t find user with this email';
        case 'FIELDS_NOT_EQUAL':
            return 'Passwords must match';
        case 'BLOCKED_USER':
            return 'This user account blocked';
        case 'TOO_HIGH':
            return 'Max size of the file is options.max MB';
        case 'NOT_ENOUGH_SPACE':
            return 'Film storage limit is exceeded';
        case 'NEED_FOR_VALIDATION':
            return 'To be able to send a question to validation, field must be filled';
        case 'NOT_UNIQUE' :
            if (options.type && options.type === 'email') {
                return 'User with this email address already registred';
            }
            break;
        case 'SPAM_DETECTED':
            return 'You can change password only one time per 30 minuts';
        default:
            break;
    }
}
