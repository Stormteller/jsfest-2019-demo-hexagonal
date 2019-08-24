import {Event} from '../../../src/core/component/event/domain/data/Event';
import {DEFAULT_EVENT, DEFAULT_USER} from '../../common/constructionObjects';
import mocks, {resetAllMocks} from '../../common/mocks';
import {anything, deepEqual, instance, verify, when} from 'ts-mockito';
import {EventReminderService} from '../../../src/core/component/event/application/services/EventReminderService';
import {User} from '../../../src/core/component/user/domain/data/User';
import sinon = require('sinon');

describe('event reminder service tests', () => {
    let eventService: EventReminderService;
    const userRepoMock = mocks.postgres.user.userRepositoryMock;
    const notificationServiceMock = mocks.fcm.fcmServiceAdapter;
    let clock;

    before(async () => {
        eventService = new EventReminderService(
            instance(notificationServiceMock),
            instance(userRepoMock)
        );
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        resetAllMocks();
        clock.reset();
    });

    it('should setup reminder', async () => {
        const testUserId = 1;
        const testEventId = 2;
        const testEvent = Event.fromObject({
            ...DEFAULT_EVENT,
            id: testEventId
        });
        const testUser = User.fromObject({
            ...DEFAULT_USER,
            notificationTokens: ['token123']
        });

        when(userRepoMock.findById(testUserId)).thenResolve(testUser);

        await eventService.setupReminder(testEvent);
        clock.tick(1);

        const expectedMessage = {
            title: `It is time to ${testEvent.title}`,
            body: 'Hello from JSFest!',
            data: {eventId: testEvent.id}
        };
        verify(notificationServiceMock.sendNotifications(deepEqual(expectedMessage), anything())).once();
    });


});
