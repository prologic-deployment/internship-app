const InternStatus = Object.freeze({
    ACCEPTED: 'Accepted',
    DECLINED: 'Declined',
    WAITING_LIST: 'WaitingList',
    WAITING: 'Waiting'
});

const TaskStatus = Object.freeze({
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED'
});
const NetworkRequestStatus = Object.freeze({
    PENDING: 'PENDING',
    TREATED: 'TREATED',
});
const LabStatus = Object.freeze({
    PENDING: 'PENDING',
    IN_PROGRESS: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    DECLINED: 'DECLINED'
});
const TaskPriority = Object.freeze({
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH'
});

const Roles = Object.freeze({
    ADMIN: 'ADMIN',
    ASSISTANT: 'ASSISTANT',
    STAGIAIRE: 'STAGIAIRE',
    ENCADRANT: 'ENCADRANT'
});

module.exports = { InternStatus, Roles,TaskStatus,TaskPriority,LabStatus,NetworkRequestStatus };
