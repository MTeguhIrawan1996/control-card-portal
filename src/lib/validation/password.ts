import { z } from 'zod/v4';

import { zPasswordValidation, zRequiredString } from '@/lib/validation/common';

export const PasswordSettingSchema = z
  .object({
    password: zPasswordValidation,
    confirmPassword: zRequiredString,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword'],
  });

export type TPasswordSettingSchema = z.infer<typeof PasswordSettingSchema>;
