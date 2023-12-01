import React, { PropsWithChildren, createContext, useContext } from 'react';

export type TChatContext = {};

const ChatContext = createContext<TChatContext>(null as unknown as TChatContext);

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return <ChatContext.Provider value={value as TChatContext}>{children}</ChatContext.Provider>;
};
