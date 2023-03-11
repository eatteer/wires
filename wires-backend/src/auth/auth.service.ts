import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/database';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { IPayload } from './interfaces';
import { equals } from 'class-validator';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async userExists(username: string, email?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
        email,
      },
    });
    return user;
  }

  async validateUser(
    username: string,
    password: string,
    email?: string,
  ): Promise<User> {
    const user = await this.userExists(username, email);
    if (!user) throw new UnauthorizedException(`User ${user} was not found`);
    const isPasswordValid = await this.comparePassword(password, user);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async validateByUserId(userId: string) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async validateJwt(
    token: string,
  ): Promise<IPayload & { iat: number; exp: number }> {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async createJwt(user: User): Promise<IResponse> {
    const payload: IPayload = { username: user.username, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: this.configService.get('JWT_EXPIRES_IN'),
      message: 'Successfully logged in',
      status: true,
    };
  }

  async login(user: LoginDto): Promise<IResponse> {
    const { username, password } = user;
    const userValidated = await this.validateUser(username, password);

    return await this.createJwt(userValidated);
  }

  async register(user: RegisterDto): Promise<User> {
    const { username, email, fullname } = user;
    const userExists = await this.userExists(username, email);
    if (!userExists) {
      const password = await this.hashPassword(user.password);
      try {
        const newUser = this.userRepository.create({
          id: uuidv4(),
          username,
          email,
          fullname,
          password,
        });
        const response = await this.userRepository.save(newUser);
        return this.genResponse(response);
      } catch (error) {
        throw new BadRequestException(`${error.driverError.detail}`);
      }
    }
    throw new BadRequestException('User already exists');
  }

  public async refresh(userId: string) {
    // Receive userId
    // Find user by id
    const user = await this.userRepository.findOneBy({ id: userId });
    // Create JWT
    return this.createJwt(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(
    password: string,
    user: User,
  ): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  private genResponse(response: User): User {
    ['password', 'createdAt', 'updatedAt'].map((item) => {
      Object.keys(response).map((key) => {
        if (equals(key, item)) {
          delete response[key];
        }
      });
    });
    return response;
  }
}
