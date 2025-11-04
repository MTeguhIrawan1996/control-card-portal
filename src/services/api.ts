/* eslint-disable @typescript-eslint/no-explicit-any */

import { env } from '@/env';

// lib/api.ts
interface FetchOptions extends RequestInit {
  baseURL?: string;
  timeout?: number;
  params?: Record<string, any>;
}

interface IDefault {
  baseURL: string;
  headers: Record<string, any>;
  timeout?: number;
}

// Global defaults
const defaults: IDefault = {
  baseURL: `${env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  },
  timeout: 10000,
};

// Helper function untuk build query params
const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
};

// Simple fetch wrapper
const api = async <T = any>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const {
    baseURL = defaults.baseURL,
    timeout = defaults.timeout,
    headers = {},
    params,
    ...fetchOptions
  } = options;

  // Build URL with params
  let fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;

  if (params && Object.keys(params).length > 0) {
    const queryString = buildQueryParams(params);
    const separator = fullURL.includes('?') ? '&' : '?';
    fullURL += `${separator}${queryString}`;
  }

  // Merge headers
  const mergedHeaders = { ...defaults.headers, ...headers };

  // Setup timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(fullURL, {
      ...fetchOptions,
      headers: mergedHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // if (!response.ok) {
    //   throw Error(`${response.status}: ${response.statusText}`);
    // }

    // Auto parse response

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return await response.json();
    }

    return (await response.text()) as unknown as T;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// HTTP methods
export const get = <T = any>(url: string, options?: FetchOptions) =>
  api<T>(url, { ...options, method: 'GET' });

export const post = <T = any>(
  url: string,
  data?: any,
  options?: FetchOptions,
) => api<T>(url, { ...options, method: 'POST', body: JSON.stringify(data) });

export const put = <T = any>(url: string, data?: any, options?: FetchOptions) =>
  api<T>(url, { ...options, method: 'PUT', body: JSON.stringify(data) });

export const del = <T = any>(url: string, options?: FetchOptions) =>
  api<T>(url, { ...options, method: 'DELETE' });

// Global config setters
export const setBaseURL = (url: string) => {
  defaults.baseURL = url;
};

export const setAuthToken = (token: string) => {
  defaults.headers.Authorization = `Bearer ${token}`;
};

export const clearAuth = () => {
  delete defaults.headers.Authorization;
};

export const setGlobalHeader = (key: string, value: string) => {
  defaults.headers[key] = value;
};

// Export main function
export default api;
