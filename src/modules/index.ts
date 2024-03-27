import { CoreModule } from './core/core.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { TravelsModule } from './travels/travels.module';

export const MainModules = [CoreModule, UsersModule, PostModule, TravelsModule];
