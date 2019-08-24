import {Application} from 'express';
import {AcceptanceSetupManager, chai} from '../base';
import mocks from '../../common/mocks';
import {deepEqual, when} from 'ts-mockito';
import {DEFAULT_USER} from '../../common/constructionObjects';
import {User} from '../../../src/core/component/user/domain/data/User';

describe('user acceptance tests', () => {
    let app: Application;
    let setupManager: AcceptanceSetupManager;
    const userRepoMock = mocks.postgres.user.userRepositoryMock;

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

    it('should complete registration successfully', () => {
        const testUserId = 1;
        const testUser = User.fromObject({
            ...DEFAULT_USER,
            id: testUserId
        });
        const body = {
            phone: DEFAULT_USER.phone,
            username: DEFAULT_USER.username
        };


        when(userRepoMock.findByUsername(body.username)).thenResolve(null);
        when(userRepoMock.save(deepEqual(User.fromObject({...body})))).thenResolve(testUser);

        return chai.request(app)
            .post(`/api/user`)
            .send(body)
            .then(res => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.id).to.equal(testUserId);
            });
    });

    it('should return 400 if username already exists', () => {
        const testUserId = 1;
        const testUser = User.fromObject({
            ...DEFAULT_USER,
            id: testUserId
        });
        const body = {
            phone: DEFAULT_USER.phone,
            username: DEFAULT_USER.username
        };

        when(userRepoMock.findByUsername(body.username)).thenResolve(testUser);

        return chai.request(app)
            .post(`/api/user`)
            .send(body)
            .then(res => {
                chai.expect(res).to.have.status(400);
            });
    });
});
