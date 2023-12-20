import { PropsWithChildren, createContext, useContext } from 'react';

export type TChatBotContext = {};

const ChatBotContext = createContext<TChatBotContext>(null as unknown as TChatBotContext);

export const useChatBotContext = () => {
  return useContext(ChatBotContext);
};

export const ChatBotProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ChatBotContext.Provider value={value as TChatBotContext}>{children}</ChatBotContext.Provider>
  );
};
