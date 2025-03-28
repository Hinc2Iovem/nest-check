import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() userDto: CreateUserDTO) {
    return this.authService.login(userDto);
  }

  @Post("/register")
  register(@Body() userDto: CreateUserDTO) {
    return this.authService.register(userDto);
  }
}
