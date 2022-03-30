import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { v4 } from 'uuid';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { User, UserKey, UserRole } from './entities/user.entity';
import { genSalt, compare, hash } from 'bcryptjs'
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly model: Model<User, UserKey>,
  ) {}
  async regenerateSaltAndHash(password: string){
    const salt = await genSalt(10);
    const pwdHash = await hash(password, salt);
    return { passwordSalt: salt, passwordHash: pwdHash}
  }
  async comparePasswords(password: string, hash: string){
    return await compare(password, hash);
  }
  async create(createUserInput: CreateUserInput) {
    const existing = await this.model.query('email').eq(createUserInput.email).exec();
    if (existing.length > 0) {
      throw new BadRequestException('Can not create user with existing email');
    }
    const { passwordSalt, passwordHash} = await this.regenerateSaltAndHash(createUserInput.password);
    return this.model.create({...createUserInput, 
      id: v4(), 
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordSalt,
      passwordHash 
    });
  }

  findOne(id: UserKey) {
    return this.model.get(id);
  }
  findByEmail(email: string) {
    return this.model.query('email').eq(email).limit(1).exec();
  }

  async update(key: UserKey, input: UpdateUserInput) {
    const model = await this.model.get(key);
    if (!model) throw new BadRequestException('User not found');
    for (const prop in input) {
      if (prop !== "id"){
        if (prop !== "password")
          if (prop !== 'userRole') (model as any)[prop] = (input as any)[prop];
      }
    }
    if (input.password){
      const { passwordSalt, passwordHash} = await this.regenerateSaltAndHash(input.password);
      model.passwordHash = passwordHash;
      model.passwordSalt = passwordSalt
    }
    input.userRole && model.userRole === UserRole.admin && (model.userRole = input.userRole);
    model.updatedAt = new Date();
    return this.model.update(model);
  }

  remove(id: string) {
    return this.model.delete({id});
  }
}
