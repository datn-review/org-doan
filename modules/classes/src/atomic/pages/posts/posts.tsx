import { PostsProvider } from './posts.context';
import PostsApp from './posts.app';
import { ComponentInject } from '@org/ui';

export const PostsPage = ComponentInject({
  template: [],
  providers: [PostsProvider],
  bootstrap: PostsApp,
});
