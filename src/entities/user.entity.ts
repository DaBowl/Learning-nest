import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'public', name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character', { length: '255', name: 'name', nullable: true })
  name: string;

  @Column('character', { length: '255', name: 'email', nullable: true })
  email: string;

  @Column('character', { length: '255', name: 'email', nullable: true })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}
