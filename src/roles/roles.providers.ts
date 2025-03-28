import { PROVIDERS } from "src/const/PROVIDERS";
import { Role } from "./roles.model";

export const rolesProviders = [
  {
    provide: PROVIDERS.ROLES,
    useValue: Role,
  },
];
