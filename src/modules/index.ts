import { CoreModule } from './core/core.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { TravelNotesModule } from 'src/modules/travel-notes/travel-notes.module';


export const MainModules = [CoreModule, UsersModule, PostModule, TravelNotesModule];
