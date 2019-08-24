import {mock, reset} from 'ts-mockito';
import {EventRepositoryAdapter} from '../../src/secondaryAdapters/postgres/event/repository/EventRepositoryAdapter';
import {UserRepositoryAdapter} from '../../src/secondaryAdapters/postgres/user/repository/UserRepositoryAdapter';
import {FCMNotificationAdapter} from '../../src/secondaryAdapters/notification/FCMNotificationAdapter';
import * as R from 'ramda';

const mocks = {
    postgres: {
        user: {
            userRepositoryMock: mock(UserRepositoryAdapter)
        },
        event: {
            eventRepositoryMock: mock(EventRepositoryAdapter)
        },
    },
    fcm: {
        fcmServiceAdapter: mock(FCMNotificationAdapter)
    }
};

export default mocks;

export function resetAllMocks() {
    const mockPaths = [
        ['postgres', 'user', 'userRepositoryMock'],
        ['postgres', 'event', 'eventRepositoryMock'],
        ['fcm', 'fcmServiceAdapter'],
    ];
    // @ts-ignore
    const valuesFromPath = R.curry((paths, obj) => R.ap([R.path(R.__, obj)], paths));
    valuesFromPath(mockPaths, mocks).forEach(reset);
}
