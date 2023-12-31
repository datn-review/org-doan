/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './setupEnv';
import './index.css';

import React from 'react';
// import {createRoot} from 'react-dom/client';

import App from './App';
// import default from './../../automation/jest.config';

// Handle runtime errors
const showErrorOverlay = (err: Event) => {
  const ErrorOverlay = customElements.get('vite-error-overlay');
  if (!ErrorOverlay) {
    return;
  }
  const overlay = new ErrorOverlay(err);
  const body = document.body;
  if (body !== null) {
    body.appendChild(overlay);
  }
};

window.addEventListener('error', showErrorOverlay);
window.addEventListener('unhandledrejection', ({ reason }) => showErrorOverlay(reason));

function AppEditor({
  ...props
}: {
  onChange?: (value: string) => void;
  defaultValue: string;
  isShow?: boolean;
}) {
  return <App {...props} />;
}
export default AppEditor;
