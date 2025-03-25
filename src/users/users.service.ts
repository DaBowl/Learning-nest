import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async create(email: string, password: string) {
    let hashedPassword: string = '';

    // 哈希密码
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
      } else {
        console.log('Hashed password:', hash);
        hashedPassword = hash;
        // bcrypt.compare(password, hash, (err, result) => {
        //   if (err) {
        //     console.error('Error comparing password:', err);
        //   } else if (result) {
        //     console.log('Password is valid!');
        //   } else {
        //     console.log('Password is invalid.');
        //   }
        // });
      }
    });

    const user = this.userEntity.create({
      email,
      password: hashedPassword,
    });
    return this.userEntity.save(user);
  }

  findByEmail(email: string) {
    return this.userEntity.findOne({ where: { email } });
  }
}
