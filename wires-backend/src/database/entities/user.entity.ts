import { Message } from './message.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    type: 'varchar',
  })
  id: string;

  @Column({
    name: 'username',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'full_name',
    type: 'varchar',
    nullable: false,
  })
  fullname: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => Message, (Message) => Message.user)
  messages: Message[];
}
