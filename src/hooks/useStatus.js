import { useState } from 'react';

const useStatus = () => {
  const [appState, setAppState] = useState([]);

  const loadingProcess = (type, message, loadingId = -1) => {
    setAppState((value) => [
      ...value,
      { state: 'loading', type, message, loadingId },
    ]);
  };

  const successProcess = (type, loadingId = -1) => {
    setAppState((value) =>
      value.filter((x) => !(x.type === type && x.loadingId === loadingId))
    );
  };

  const errorProcess = (type, message, loadingId = -1) => {
    setAppState((value) =>
      value.map((x) => {
        if (x.type === type && x.loadingId === loadingId) {
          return { ...x, state: 'error', message };
        }
        return x;
      })
    );
  };

  return {
    loadingProcess,
    successProcess,
    errorProcess,
    appState,
  };
};

export default useStatus;
