import {EntityManager, getManager, Repository} from 'typeorm';
import {injectable, unmanaged} from 'inversify';

@injectable()
export class BaseTypeORMRepository<T> {
    protected entity: new() => T;

    constructor(@unmanaged() entity: new() => T) {
        this.entity = entity;
    }

    protected get entityManager(): EntityManager {
        return getManager();
    }

    protected get repository(): Repository<T> {
        return this.entityManager.getRepository<T>(this.entity);
    }

}
