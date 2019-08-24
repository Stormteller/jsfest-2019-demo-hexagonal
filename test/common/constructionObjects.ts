import {EventType} from '../../src/core/component/event/domain/data/EventType';

const DEFAULT_USER = {
    id: 1,
    phone: '+380635555555',
    username: 'username',
    notificationTokens: []
};

const DEFAULT_EVENT = {
    id: 1,
    title: 'Test-egg',
    startDate: new Date(2019, 1, 1),
    endDate: new Date(2019, 1, 2),
    creatorId: 1,
    eventType: EventType.PERSONAL,
    createdAt: new Date(2018, 1, 1)
};

export {
    DEFAULT_USER,
    DEFAULT_EVENT
}
