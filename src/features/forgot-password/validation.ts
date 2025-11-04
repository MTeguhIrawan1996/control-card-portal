import { z } from 'zod/v4';

export const ForgotPasswordSchema = z.object({
  email: z.email(),
});

export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;
