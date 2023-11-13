import React from 'react';
import { ProfileProvider } from './profile-context';
import ProfileApp from './profile-app';
import './profile-styled.css';

export function ProfilePage() {
  return (
    <ProfileProvider>
      <ProfileApp />
    </ProfileProvider>
  );
}
