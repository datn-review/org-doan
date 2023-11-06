import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TPostsContext = {};

const PostsContext = createContext<TPostsContext>(null as unknown as TPostsContext);

export const usePostsContext = () => {
  return useContext(PostsContext);
};

export const PostsProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return <PostsContext.Provider value={value as TPostsContext}>{children}</PostsContext.Provider>;
};
