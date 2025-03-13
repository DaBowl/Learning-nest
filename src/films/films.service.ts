import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async getUserList(): Promise<UserEntity[]> {
    const result = await this.userRepository.find();
    return result;
  }

  async getUser(id: number): Promise<UserEntity> {
    const result = await this.userRepository.findOne({
      where: { id },
    });
    throw new HttpException('Forbidden,', HttpStatus.FORBIDDEN);
    return result;
  }
}
