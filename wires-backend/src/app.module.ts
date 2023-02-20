import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [ConfigurationModule, AuthModule, MessagesModule, CommonModule],
})
export class AppModule {}
