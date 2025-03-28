import { Inject, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post-dto";
import { PROVIDERS } from "src/const/PROVIDERS";
import { Post } from "./posts.model";
import { FilesService } from "src/files/files.service";

@Injectable()
export class PostsService {
  constructor(
    @Inject(PROVIDERS.POSTS) private postRepository: typeof Post,
    private fileService: FilesService
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
