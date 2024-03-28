import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModules } from 'src/modules';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { TravelNotesModule } from 'src/modules/travel-notes/travel-notes.module';
import { CountriesModule } from 'src/modules/conuntries/countries.module';
import { CitiesModule } from 'src/modules/cities/cities.module';

@Module({
  imports: [
    ...MainModules,
    RouterModule.register([
      { path: '/api/users', module: UsersModule },
      { path: '/api/travel-notes', module: TravelNotesModule },
      { path: '/api/countries', module: CountriesModule },
      { path: '/api/cities', module: CitiesModule },
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
