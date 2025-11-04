import { PostgrestError, Session, User } from '@supabase/supabase-js';
import { UseMutationOptions } from '@tanstack/react-query';

import { createClient } from '@/lib/supabase/client';

import { TRegisterSchema } from '@/features/register/validation';

export interface IRegisterResponse {
  user: User | null;
  session: Session | null;
}

export interface IRegisterUserArgs {
  mutationOption: UseMutationOptions<
    IRegisterResponse | null,
    PostgrestError,
    TRegisterSchema
  >;
  variables: TRegisterSchema;
}

const supabase = createClient();

export const registerService = {
  async registerUser(variables: IRegisterUserArgs['variables']) {
    const { email, password, fullname } = variables;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullname,
        },
      },
    });

    if (error) throw error;

    return data;
  },
};
