import { PROVIDERS } from "src/const/PROVIDERS";
import { Post } from "./posts.model";

export const postsProviders = [
  {
    provide: PROVIDERS.POSTS,
    useValue: Post,
  },
];
