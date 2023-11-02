import React from 'react';
import { LookForTutorProvider } from './look-for-tutor.context';
import LookForTutorApp from './look-for-tutor.app';
import './look-for-tutor.styled.css';

export function LookForTutorPage() {
  return (
    <LookForTutorProvider>
      <LookForTutorApp />
    </LookForTutorProvider>
  );
}
