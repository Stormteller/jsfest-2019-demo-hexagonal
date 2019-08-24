import 'reflect-metadata';
import * as chai from 'chai';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import AppInitializer from '../../src/AppInitilizer';
import {Application} from 'express';
import {Container} from 'inversify';
import * as PostgresConnection from '../../src/secondaryAdapters/postgres/Connection';
import mocks, {resetAllMocks} from '../common/mocks';
import {instance} from 'ts-mockito';
import chaiHttp = require('chai-http');
import {UserRepository, UserRepositoryType} from '../../src/core/component/user/port/UserRepository';
import {EventRepository, EventRepositoryType} from '../../src/core/component/event/port/EventRepository';
import {NotificationService, NotificationServiceType} from '../../src/core/port/notification/NotificationService';
import {SinonFakeTimers} from 'sinon'; // tslint:disable-line

chai.use(chaiHttp);

export {chai};

export class AcceptanceSetupManager {
    private stubs: SinonStub[];
    public clock: SinonFakeTimers;

    public async beforeAcceptance(): Promise<Application> {
        this.stubs = [
            sinon.stub(PostgresConnection, 'createConnectionPool'),
        ];

        await AppInitializer.initialize();
        this.mockPostgresAdapters(AppInitializer.diContainer);
        this.mockFCM(AppInitializer.diContainer);

        this.clock = sinon.useFakeTimers();

        return AppInitializer.app;
    }

    public afterAcceptance() {
        this.stubs.forEach(stub => stub.restore());
    }

    public afterEachAcceptance() {
        this.clock.restore();
        resetAllMocks();
    }

    private mockPostgresAdapters(container: Container): void {
        // User
        container.rebind<UserRepository>(UserRepositoryType)
            .toConstantValue(instance(mocks.postgres.user.userRepositoryMock));

        // Event
        container.rebind<EventRepository>(EventRepositoryType)
            .toConstantValue(instance(mocks.postgres.event.eventRepositoryMock));
    }

    private mockFCM(container: Container): void {
        container.rebind<NotificationService>(NotificationServiceType)
            .toConstantValue(instance(mocks.fcm.fcmServiceAdapter));
    }
}

