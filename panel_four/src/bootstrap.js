import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for createRoot
import App from './App';

const mount = (el) => {
  if (!el) {
    throw new Error("No DOM element provided to mount the React application.");
  }

  // Use createRoot to render the application
  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Return root for unmounting if needed later
  return root;
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_Panel-four-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// Export the mount function for container usage
export { mount };
