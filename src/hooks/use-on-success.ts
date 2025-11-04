/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import { UseQueryResult } from '@tanstack/react-query';

type SuccessCallback<T> = (data: NonNullable<T>) => void;

export function useOnSuccess<T>(
  queryResult: Partial<UseQueryResult<T>>,
  callback: SuccessCallback<T>,
  deps: React.DependencyList = [],
) {
  const { data, isSuccess } = queryResult;

  const previousSuccessRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (isSuccess && data && !previousSuccessRef.current) {
      callback(data);
      previousSuccessRef.current = true;
    }

    // Reset jika query di-refetch
    if (!isSuccess) {
      previousSuccessRef.current = false;
    }
  }, [isSuccess, data, callback, ...deps]);
}
