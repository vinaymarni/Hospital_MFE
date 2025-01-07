import React, { lazy, Suspense } from 'react';
import { useAtom } from 'jotai';

import { remotesData } from '../store/globalStates';
import { ErrorBoundary } from 'react-error-boundary';
import BlankPanel from './BlankPanel';

const remotes = {
    panel_one:  lazy(() => import('./PanelOneApp')),
    panel_two: lazy(() => import('./PanelTwoApp')),
    panel_three: lazy(() => import('./PanelThreeApp')),
    panel_four: lazy(() => import('./PanelFourApp')),
    panel_login: lazy(() => import('./PanelLogin')),
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

export const RemoteComponent = ({keyName}) => {
  const [{activeRemotes}] = useAtom(remotesData);
  const Component = remotes[keyName];

  return(
    <>
      {activeRemotes !== null && activeRemotes.has(keyName) ?
       <ErrorBoundary
          key={keyName}
          FallbackComponent={ErrorFallback} 
          onReset={() => {
            // Optional: reset state or perform other actions on retry
            console.log('Reseting error boundary');
          }}
        >
          <Suspense fallback={<div>Loading {keyName.replace('_', ' ')}...</div>}>
            <Component />
          </Suspense>
        </ErrorBoundary>
        :
        <BlankPanel panel={keyName.replace('_', ' ')} />
      }
    </>
  )
};
