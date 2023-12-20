import React from 'react';
import { LookForTutorProvider } from './look-for-tutor.context';
import LookForTutorApp from './look-for-tutor.app';
import './look-for-tutor.styled.css';
import LookForTutorEditApp from '../../classes/src/atomic/molecules/post/look-for-tutor-edit.app';

export function LookForTutorPage() {
  return (
    <LookForTutorProvider>
      <LookForTutorApp />
    </LookForTutorProvider>
  );
}
export function LookForTutorEditPage() {
  return (
    <LookForTutorProvider>
      <LookForTutorEditApp />
    </LookForTutorProvider>
  );
}
