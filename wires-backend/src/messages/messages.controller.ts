import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from 'src/database';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FindMessageDto } from './dto/findMessage.dto';
import { CreateMessageDto } from './dto/createMessage.dto';
import { commentDto } from './dto/comment.dto';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createPostDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get('me/:id')
  findOne(@Param('id') id: string): Promise<Message> {
    return this.messagesService.findOne(+id);
  }

  @Get('me')
  findOwnerMessages(@Body() findMessage: any): Promise<Message[]> {
    return this.messagesService.findOwnerAll(findMessage);
  }

  @Post('find')
  findFilterMessages(@Body() findMessage: FindMessageDto): Promise<Message[]> {
    console.log(findMessage);
    return this.messagesService.findFilterMessage(findMessage);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }

  @Patch('comment/:id')
  createComment(
    @Param('id') id: string,
    @Body() comment: commentDto,
  ): Promise<Message> {
    return this.messagesService.createComment(+id, comment);
  }
}
