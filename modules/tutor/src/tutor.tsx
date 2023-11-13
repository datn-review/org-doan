import React from 'react';
import { TutorProvider } from './tutor.context';
import TutorApp from './tutor.app';
import './tutor.styled.css';

export function TutorPage() {
  return (
    <TutorProvider>
      <TutorApp />
    </TutorProvider>
  );
}
