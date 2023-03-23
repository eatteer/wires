import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Message } from '../database/entities/message.entity';
import { CreateMessageDto } from './dto/createMessage.dto';
import { FindMessageDto } from './dto/findMessage.dto';
import { commentDto } from './dto/comment.dto';
import { equals } from 'class-validator';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createPost: CreateMessageDto) {
    const post = this.messageRepository.create({
      ...createPost,
    });
    try {
      return await this.messageRepository.save(post);
    } catch (error) {
      throw new BadRequestException(`${error.driverError.detail}`);
    }
  }

  async findOne(id: number): Promise<Message> {
    const post = await this.messageRepository.findOne({
      where: { id: id },
      select: [
        'id',
        'title',
        'text',
        'createdAt',
        'updatedAt',
        'user',
        'comments',
      ],
      relations: {
        user: true,
      },
    });
    delete post.user.password;

    if (!post) throw new NotFoundException('Message not found');
    return post;
  }

  async findOwnerAll(find: any): Promise<Message[]> {
    try {
      return await this.messageRepository.find({
        where: {
          user: {
            id: find.user,
          },
        },
        relations: {
          user: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(`${error.driverError}`);
    }
  }

  async findAll(): Promise<any> {
    const response = await this.messageRepository.find({
      relations: {
        user: true,
      },
    });
    response.map((message) => {
      delete message.user.password;
    });
    return response;
  }

  async remove(id: string) {
    const response = await this.findOne(+id);

    if (!response) throw new NotFoundException('Message not found');
    return await this.messageRepository.delete(id);
  }

  async findFilterMessage(findMessage: FindMessageDto): Promise<Message[]> {
    const { date, search } = findMessage;
    const res = await this.messageRepository.find({
      where: [
        {
          title: ILike(`%${search}%`),
          createdAt: date,
        },
      ],
      relations: { user: true },
    });

    if (!res.length) throw new NotFoundException();
    return res;
  }

  async createComment(id: number, comment: commentDto): Promise<Message> {
    const { comments, ...result } = await this.findOne(id);
    if (equals(result.user.id, comment.user))
      throw new BadRequestException('you cannot comment on your messages');
    await this.messageRepository.save({
      ...result,
      comments: [...comments, comment],
    });
    return await this.findOne(id);
  }
}
