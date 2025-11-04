import { z } from 'zod/v4';

import { zRequiredString } from '@/lib/validation/common';

export const LoginSchema = z.object({
  email: z.email(),
  password: zRequiredString,
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
