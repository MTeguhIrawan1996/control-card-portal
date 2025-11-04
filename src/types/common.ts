import { ReactNode } from 'react';
import {
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

export type IQueryOptions<T, D = T> = Partial<
  UseQueryOptions<T, Error, D | undefined>
>;
export type ISuspenaseQueryOptions<T, D = T> = Partial<
  UseSuspenseQueryOptions<T, Error, D | undefined>
>;

export interface ILabelValue<T = ReactNode | string | number | null> {
  label: string;
  value: T;
}

export type Nullish<T> = {
  [P in keyof T]?: T[P] | null;
};

export interface IMeta {
  row_count: number;
  page_size: number;
  page: number;
  page_count: number;
}

export interface IGRequest {
  page_size: number;
  page: number;
}

export interface IGResponse<TData> {
  data: TData;
  meta: IMeta;
  success: boolean;
  message: string;
}
