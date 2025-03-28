import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PROVIDERS } from "src/const/PROVIDERS";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role-dto";
import { BanUserDto } from "./dto/ban-user-dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDERS.USERS) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDTO) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("ADMIN");
    if (role) {
      await user.$set("roles", [role.id]);
      user.roles = [role];
    }
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return `${user.email} got his new role ${role.value}`;
    }

    throw new HttpException("User was not found", HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("User was not found", HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
