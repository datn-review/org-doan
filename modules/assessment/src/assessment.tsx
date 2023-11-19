import React from 'react';
import { AssessmentProvider } from './assessment.context';
import AssessmentApp from './assessment.app';
import './assessment.styled.css';

export function AssessmentPage() {
  return (
    <AssessmentProvider>
      <AssessmentApp />
    </AssessmentProvider>
  );
}
