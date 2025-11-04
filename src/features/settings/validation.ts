import { z } from 'zod/v4';

import { zImageValidation, zRequiredString } from '@/lib/validation/common';

export const ProfileSchema = z.object({
  fullname: zRequiredString,
  email: z.email(),
  avatar: zImageValidation.nullable(),
  bio: z.string(),
});

export type TProfileSchema = z.infer<typeof ProfileSchema>;
