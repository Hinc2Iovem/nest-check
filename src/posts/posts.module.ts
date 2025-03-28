import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { postsProviders } from "./posts.providers";
import { FilesModule } from "src/files/files.module";

@Module({
  providers: [PostsService, ...postsProviders],
  controllers: [PostsController],
  imports: [DatabaseModule, FilesModule],
})
export class PostsModule {}
