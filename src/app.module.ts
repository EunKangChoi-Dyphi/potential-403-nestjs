import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModules } from 'src/modules';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UsersModule } from './modules/users/users.module';
import { TravelNotesModule } from 'src/modules/travel-notes/travel-notes.module';
import { AllExceptionFilter } from 'src/filters/all-exception.filter';


@Module({
  imports: [
    ...MainModules,
    RouterModule.register([
      { path: '/api/users', module: UsersModule },
      { path: '/api/travel-notes', module: TravelNotesModule },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // global pipe : validationPipe
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
