import { PROVIDERS } from "src/const/PROVIDERS";
import { User } from "./users.model";

export const usersProviders = [
  {
    provide: PROVIDERS.USERS,
    useValue: User,
  },
];
