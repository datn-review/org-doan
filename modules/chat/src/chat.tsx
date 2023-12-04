import React from 'react';
import { ChatProvider } from './chat.context';
import ChatApp from './chat.app';
import './chat.styled.css';

export function ChatPage() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}
