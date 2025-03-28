import { Inject, Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/createRoleDto";
import { PROVIDERS } from "src/const/PROVIDERS";
import { Role } from "./roles.model";

@Injectable()
export class RolesService {
  constructor(@Inject(PROVIDERS.ROLES) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
