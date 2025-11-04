import { z } from 'zod/v4';

import { zPasswordValidation, zRequiredString } from '@/lib/validation/common';

export const RegisterSchema = z
  .object({
    email: z.email(),
    fullname: zRequiredString,
    password: zPasswordValidation,
    confirmPassword: zRequiredString,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword'],
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
