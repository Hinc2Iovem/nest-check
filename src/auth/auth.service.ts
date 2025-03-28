import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDTO) {
    const user = await this.validateUser(userDto);
    if (user) {
      return this.generateToken(user);
    }
  }

  async register(userDto: CreateUserDTO) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException("User with such email already exists.", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashedPassword });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDTO) {
    const user = await this.userService.getUserByEmail(userDto.email);
    let passwordMatched;
    if (user) {
      passwordMatched = await bcrypt.compare(userDto.password, user.dataValues.password);
    }

    if (passwordMatched) {
      return user;
    } else {
      throw new UnauthorizedException({ message: "Something went wrong" });
    }
  }
}
