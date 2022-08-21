import { FC, createContext, useContext, useState } from 'react';
import { AbsoluteLoadingIndicator } from '@/components/Placeholders';

export interface LoadingContextData {
  isLoading: boolean;
  pushLoading: () => void;
  popLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
);

export const LoadingProvider: FC = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  function pushLoading() {
    setLoadingCount(count => count + 1);
  }

  function popLoading() {
    setLoadingCount(count => count - 1);
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading: loadingCount > 0,
        pushLoading,
        popLoading,
      }}
    >
      {children}
      {loadingCount > 0 && <AbsoluteLoadingIndicator />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
