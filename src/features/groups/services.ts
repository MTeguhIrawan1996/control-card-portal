import { createClient } from '@/lib/supabase/client';

import { Database } from '../../../database.types';

import { IGRequest, IGResponse, IQueryOptions } from '@/types/common';

export type TGroupsData = Database['public']['Tables']['groups']['Row'];

export interface IGroupsResponse extends TGroupsData {
  groupMember: {
    id: string;
    role: string;
  };
  memberCount: number;
}

export interface IGetGroupsArgs {
  options: IQueryOptions<IGResponse<IGroupsResponse[]> | null>;
  request: Partial<IGRequest>;
}

const supabase = createClient();

export const groupService = {
  async getGroups(req: Partial<IGetGroupsArgs['request']>) {
    const { page, page_size } = req;
    const { data } = await supabase.rpc('get_groups', { page, page_size });

    return data as unknown as IGResponse<IGroupsResponse[]>;
  },
};
