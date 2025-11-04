import { PostgrestError, Session, User } from '@supabase/supabase-js';
import { UseMutationOptions } from '@tanstack/react-query';

import { createClient } from '@/lib/supabase/client';
import { TPasswordSettingSchema } from '@/lib/validation/password';

export interface IPasswordSettingResponse {
  user: User | null;
  session: Session | null;
}

export interface IPasswordSettingArgs {
  mutationOption: UseMutationOptions<
    IPasswordSettingResponse | null,
    PostgrestError,
    Omit<TPasswordSettingSchema, 'confirmPassword'>
  >;
  variables: Omit<TPasswordSettingSchema, 'confirmPassword'>;
}

const supabase = createClient();

export const passwordSetting = {
  async updatePassword(variables: IPasswordSettingArgs['variables']) {
    const { password } = variables;
    const { error } = await supabase.auth.updateUser({ password });

    if (error) throw error;

    return null;
  },
};
