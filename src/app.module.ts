import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
