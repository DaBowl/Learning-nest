import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { AuthModule } from './auth/auth.module';
import { CheckUserMiddleware } from './middleware/checkuser/checkuser.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Win2008',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
  ],
  controllers: [AppController, FilmsController],
  providers: [AppService, FilmsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserMiddleware)
      .forRoutes({ path: '/films/*', method: RequestMethod.ALL });
  }
}
