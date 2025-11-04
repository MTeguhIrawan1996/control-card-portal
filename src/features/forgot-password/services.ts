import { PostgrestError, Session, User } from '@supabase/supabase-js';
import { UseMutationOptions } from '@tanstack/react-query';

import { createClient } from '@/lib/supabase/client';

import { TForgotPasswordSchema } from '@/features/forgot-password/validation';

export interface IForgotPasswordResponse {
  user: User | null;
  session: Session | null;
}

export interface IForgotPasswordUserArgs {
  mutationOption: UseMutationOptions<
    null,
    PostgrestError,
    TForgotPasswordSchema
  >;
  variables: TForgotPasswordSchema;
}

const supabase = createClient();

export const forgotPasswordService = {
  async forgotPasswordUser(variables: IForgotPasswordUserArgs['variables']) {
    const { email } = variables;
    const resetLink = `${location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetLink,
    });

    if (error) throw error;

    return null;
  },
};
