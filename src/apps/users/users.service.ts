import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private _repository: Repository<User>,
  ) {}

  async findOneOrCreate(user: Partial<User>): Promise<User> {
    let existingUser = await this._repository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      existingUser = this._repository.merge(existingUser, user);
      await this._repository.save(existingUser);
    } else if (!existingUser) {
      existingUser = this._repository.create(user);
      await this._repository.save(existingUser);
    }
    return existingUser;
  }
}
