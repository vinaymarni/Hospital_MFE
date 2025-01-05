import React, { lazy, Suspense, useEffect, useState } from 'react';
import BlankPanel from './components/BlankPanel';
import { ErrorBoundary } from 'react-error-boundary';
import "./styles/home.css";

const remotes = {
  panel_one:  lazy(() => import('./components/PanelOneApp')),
  panel_two: lazy(() => import('./components/PanelTwoApp')),
  panel_three: lazy(() => import('./components/PanelThreeApp')),
  panel_four: lazy(() => import('./components/PanelFourApp')),
  panel_login: lazy(() => import('./components/PanelLogin')),
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const extractErrorDetails = (stack) => {
    if (!stack) return null;

    const stackLines = stack.split("\n");
    const relevantLine = stackLines.find((line) =>
      line.includes("http") || line.includes("webpack")
    );

    if (relevantLine) {
      const match = relevantLine.match(/(http.*):(\d+):(\d+)/);
      if (match) {
        const [_, file, line, column] = match; // Extract file, line, and column
        return { file, line, column };
      }
    }
    return null;
  };

  const details = extractErrorDetails(error.stack);
  // console.log(error.stack)

  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      {/* <p>{error.message}</p> */}
      {details &&
        <div>
          <p>
            File: {details.file}
          </p>
          <p>
            Line: {details.line}, Column: {details.column}
          </p>
        </div>
      }
      {/* <button onClick={resetErrorBoundary}>Try Again</button> */}
    </div>
  );
};

const App = () => {
  const [activeRemotes, setActiveRemotes] = useState(null);

  const getAvaRemotes = async () => {
    let availableRemotes = [];
    const allRemotes = {
      panel_one: 'http://localhost:8081/remoteEntry.js',
      panel_two: 'http://localhost:8082/remoteEntry.js',
      panel_three: 'http://localhost:8083/remoteEntry.js',
      panel_four: 'http://localhost:8084/remoteEntry.js',
      panel_login: 'http://localhost:8085/remoteEntry.js',
    };
  
    const promises = Object.entries(allRemotes).map(async ([key, url]) => {
      try {
        await fetch(url, { method: 'HEAD' })
        .then((response) => {
          if(response) {
            availableRemotes = [...availableRemotes, key]
          };
        })
        .catch((error) => {
          console.warn(`Remote ${key} not available: ${error}`);
        })
      } catch {
        console.warn(`Remote not available: ${key} at ${url}`);
      }
    });
    await Promise.all(promises);
    // setActiveRemotes([...availableRemotes]);
    setActiveRemotes(new Set([...availableRemotes]));
    // return availableRemotes;
  };

  useEffect(()=>{
    getAvaRemotes();
  },[]);

  return (
    <div className='homeMainCon'>
      <h1>Host Application</h1>
      {Object.entries(remotes).map(([key, Component]) => (
        activeRemotes !== null && activeRemotes.has(key) ? 
        <ErrorBoundary
          key={key}
          FallbackComponent={ErrorFallback} 
          onReset={() => {
            // Optional: reset state or perform other actions on retry
            console.log('Resetting error boundary');
          }}
        >
          <Suspense fallback={<div>Loading {key.replace('_', ' ')}...</div>}>
            <Component />
          </Suspense>
        </ErrorBoundary>
        :
        <BlankPanel panel={key.replace('_', ' ')} />
      ))}
    </div>
  );
};

export default App;