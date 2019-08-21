import {inject, injectable} from 'inversify';
import {BaseTypeORMRepository} from '../../common/BaseTypeORMRepository';
import {UserEntity} from '../data/UserEntity';
import {Converter} from '../../../../core/sharedKernel/interfaces/Converter';
import {UserRepository} from '../../../../core/component/user/port/UserRepository';
import {User} from '../../../../core/component/user/domain/data/User';
import {UserEntityConverter} from '../converters/UserEntityConverter';

@injectable()
export class UserRepositoryAdapter extends BaseTypeORMRepository<UserEntity> implements UserRepository {
    private entityConverter: Converter<UserEntity, User>;

    constructor(
        @inject(UserEntityConverter) entityConverter: Converter<UserEntity, User>
    ) {
        super(UserEntity);
        this.entityConverter = entityConverter;
    }

    public async save(event: User): Promise<User> {
        const entity = this.entityConverter.to(event);
        const savedEntity = await this.repository.save(entity);
        return this.entityConverter.from(savedEntity);
    }

    public async findById(id: number): Promise<User | null> {
        const maybeEntity = await this.repository.findOne({where: {id}});
        return maybeEntity ? this.entityConverter.from(maybeEntity) : null;
    }

    public async findByUsername(username: string): Promise<User | null> {
        const maybeEntity = await this.repository.findOne({where: {username}});
        return maybeEntity ? this.entityConverter.from(maybeEntity) : null;
    }

}
