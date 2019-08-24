import {Application} from 'express';
import {AcceptanceSetupManager, chai} from '../base';
import mocks from '../../common/mocks';
import {User} from '../../../src/core/component/user/domain/data/User';
import {DEFAULT_EVENT, DEFAULT_USER} from '../../common/constructionObjects';
import {Event} from '../../../src/core/component/event/domain/data/Event';
import { when, deepEqual } from 'ts-mockito';

describe('event acceptance tests', () => {
    let app: Application;
    let setupManager: AcceptanceSetupManager;
    const userRepoMock = mocks.postgres.user.userRepositoryMock;
    const eventRepoMock = mocks.postgres.event.eventRepositoryMock;

    before(async () => {
        setupManager = new AcceptanceSetupManager();
        app = await setupManager.beforeAcceptance();
    });

    after(async () => {
        await setupManager.afterAcceptance();
    });

    afterEach(async () => {
        setupManager.afterEachAcceptance();
    });

    it('should create event successfully', () => {
        const testUserId = 1;
        const testEventId = 2;
        const testEvent = Event.fromObject({
            ...DEFAULT_EVENT,
            id: testEventId
        });
        const body = {
            title: DEFAULT_EVENT.title,
            startDate: DEFAULT_EVENT.startDate,
            endDate: DEFAULT_EVENT.endDate,
            eventType: DEFAULT_EVENT.eventType
        };

        when(eventRepoMock.save(
            deepEqual(Event.fromObject({
                ...body, creatorId: testUserId
            }))))
            .thenResolve(testEvent);
        when(userRepoMock.findById(testUserId)).thenResolve(User.fromObject({...DEFAULT_USER}));

        return chai.request(app)
            .post(`/api/event`)
            .set('user_id', `${testUserId}`)
            .send(body)
            .then(res => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.id).to.equal(testEventId);
            });
    });

    it('should return 400 on event creation if validation fails', () => {
        const testUserId = 1;
        const body = {
            startDate: DEFAULT_EVENT.startDate,
            endDate: DEFAULT_EVENT.endDate,
            eventType: DEFAULT_EVENT.eventType
        };

        return chai.request(app)
            .post(`/api/event`)
            .set('user_id', `${testUserId}`)
            .send(body)
            .then(res => {
                chai.expect(res).to.have.status(400);
            });
    });
});
