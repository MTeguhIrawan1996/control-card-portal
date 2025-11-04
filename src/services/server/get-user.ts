'use server';

import { createClient } from '@/lib/supabase/server';

import { get } from '@/services/api';

import { Database } from '../../../database.types';

type TProfilesData = Database['public']['Tables']['profiles']['Row'];

export interface IProfileObj extends TProfilesData {
  avatar_url: string | null;
}
export interface IGetUserResponse {
  data: IProfileObj | null;
}

export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const profile = await get<IGetUserResponse | null>('/get-profile', {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    next: { revalidate: 3600, tags: ['profile'] },
    cache: 'force-cache',
  });

  return profile?.data;
};
