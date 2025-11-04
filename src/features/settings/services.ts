import { PostgrestError } from '@supabase/supabase-js';
import { UseMutationOptions } from '@tanstack/react-query';

import { createClient } from '@/lib/supabase/client';

import { TProfileSchema } from '@/features/settings/validation';

import { Database } from '../../../database.types';

type TProfilesData = Database['public']['Tables']['profiles']['Row'];

type TProfilesRequest = TProfilesData & Pick<TProfileSchema, 'avatar'>;

export interface IProfileArgs {
  mutationOption: UseMutationOptions<
    TProfilesData | null,
    PostgrestError,
    Partial<TProfilesRequest>
  >;
  variables: Partial<TProfilesRequest>;
}

const supabase = createClient();

export const settingService = {
  async updateProfile(variables: Partial<IProfileArgs['variables']>) {
    // avatar_path = old_avatar
    const { id, full_name, bio, avatar, avatar_path } = variables;
    const fileExt = avatar?.type.split('/').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { data, error } = await supabase
      .from('profiles')
      .update({ full_name, bio })
      .eq('id', id || '')
      .select('id')
      .single();

    if (avatar && avatar_path) {
      const { error: oldError } = await supabase.storage
        .from('avatars')
        .remove([avatar_path]);

      if (oldError) throw oldError;
    }

    if (avatar) {
      const { error: avatarError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatar, {
          upsert: false,
        });

      if (avatarError) throw avatarError;
    }

    if (error) throw error;

    return data as TProfilesData;
  },
};
