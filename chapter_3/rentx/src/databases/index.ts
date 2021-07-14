import { Database }from "@nozbe/watermelondb";
import SQLiteAdapter  from "@nozbe/watermelondb/adapters/sqlite";

import { schemas } from './schema';
import { User } from "./models/User";
import { Car } from "./models/Car"

const adapter = new SQLiteAdapter({
  schema: schemas
});

export const database = new Database({
  adapter,
  modelClasses: [
    User,
    Car
  ],
  actionsEnabled: true,
})