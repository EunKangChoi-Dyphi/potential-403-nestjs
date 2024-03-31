import { CountriesModule } from "./conuntries/countries.module";
import { CoreModule } from "./core/core.module";
import { UsersModule } from "./users/users.module";
import { TravelNotesModule } from "src/modules/travel-notes/travel-notes.module";
import { CitiesModule } from "src/modules/cities/cities.module";

export const MainModules = [
  CoreModule,
  UsersModule,
  TravelNotesModule,
  CountriesModule,
  CitiesModule,
];
