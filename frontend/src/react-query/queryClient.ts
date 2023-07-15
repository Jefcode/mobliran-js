import { toast } from 'react-toastify';
import { QueryClient } from '@tanstack/react-query';

interface PossibleError {
  response?: {
    data?: {
      message: string;
    };
  };
  message?: string;
  toString: () => string;
}

export function queryErrorHandler(err: unknown): void {
  const error = err as PossibleError;

  const message: string =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();

  toast.error(message, {
    className: 'font-both',
    toastId: 'centeralize-error',
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
