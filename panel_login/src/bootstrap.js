import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mount = (el) => {
  if (!el) {
    throw new Error("No DOM element provided to mount the React application.");
  }

  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  return root;
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_Panel-login-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
