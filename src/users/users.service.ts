import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto).catch((err) => {
      throw new InternalServerErrorException(`user create error. ${err}`);
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find().catch((err) => {
      throw new InternalServerErrorException(`user find error. ${err}`);
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository
      .findOne({ where: { id: id } })
      .catch((err) => {
        throw new InternalServerErrorException(`user find error. ${err}`);
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
