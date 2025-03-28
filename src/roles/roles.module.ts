import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { rolesProviders } from "./roles.providers";
import { DatabaseModule } from "src/database/database.module";

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...rolesProviders],
  imports: [DatabaseModule],
  exports: [RolesService],
})
export class RolesModule {}
