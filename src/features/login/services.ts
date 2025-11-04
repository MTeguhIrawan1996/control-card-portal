import { AuthError, Session, User } from '@supabase/supabase-js';
import { UseMutationOptions } from '@tanstack/react-query';

import { createClient } from '@/lib/supabase/client';

import { TLoginSchema } from '@/features/login/validation';

export interface ILoginResponse {
  user: User | null;
  session: Session | null;
}

export interface ILoginUserArgs {
  mutationOption: UseMutationOptions<
    ILoginResponse | null,
    AuthError,
    TLoginSchema
  >;
  variables: TLoginSchema;
}

const supabase = createClient();

export const loginService = {
  async loginUser(variables: ILoginUserArgs['variables']) {
    const { email, password } = variables;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  },
};
