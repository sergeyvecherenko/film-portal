export function getChipText(status) {
    switch (status) {
        case 'IN_PROGRESS':
            return 'In progress';
        case 'COMPLETED':
            return 'Completed';
        case 'VALIDATED':
            return 'Validated';
        case 'CLOSED':
            return 'Paused';
        case 'NOT_FILLED':
            return 'Not filled';
        case 'VALIDATION':
            return 'On verification';
        case 'VALIDATION_FAILED':
            return 'Validation failed';
        case 'FILLED':
            return 'Filled';
        case 'READY_TO_VALIDATION':
            return 'Ready to validation';
        default:
            break;
    }
}
