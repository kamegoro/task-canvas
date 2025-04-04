import React, { useState, createContext, useContext } from 'react';

import Alert, { AlertPropsType } from '@/_components/atoms/Alert';
import Box from '@/_components/mui/Box';

interface SnackValues {
  showSuccess: (message: string, ms?: number) => void;
  showInfo: (message: string, ms?: number) => void;
  showError: (message: string, ms?: number) => void;
}

export const SnackbarContext = createContext<SnackValues>({
  showSuccess: () => {},
  showInfo: () => {},
  showError: () => {},
});

type SnackState = {
  id: string;
  message: string;
  type: Extract<AlertPropsType['severity'], 'success' | 'info' | 'error'>;
};

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackState, setSnackState] = useState<SnackState[]>([]);

  const showSnackbar = (message: SnackState['message'], type: SnackState['type'], ms?: number) => {
    const id = window.self.crypto.randomUUID();

    setSnackState((state) => [
      ...state,
      {
        id,
        type,
        message,
      },
    ]);

    setTimeout(() => {
      setSnackState((state) => state.filter((v) => v.id !== id));
    }, ms || 3000);
  };

  const showSuccess = (message: string, ms?: number) => {
    showSnackbar(message, 'success', ms);
  };

  const showInfo = (message: string, ms?: number) => {
    showSnackbar(message, 'info', ms);
  };

  const showError = (message: string, ms?: number) => {
    showSnackbar(message, 'error', ms);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showError,
        showInfo,
        showSuccess,
      }}
    >
      {snackState.map((v) => (
        <Box
          component="div"
          role="alert"
          aria-label={v.message}
          sx={{ position: 'absolute', zIndex: 200, top: 10, right: 10 }}
          key={v.id}
        >
          <Alert
            severity={v.type}
            sx={{ mb: 1 }}
          >
            {v.message}
          </Alert>
        </Box>
      ))}
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
