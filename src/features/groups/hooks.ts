import { useQuery } from '@tanstack/react-query';

import { GROUPS_KEYS } from '@/features/groups/keys';
import { groupService, IGetGroupsArgs } from '@/features/groups/services';

export const useGetGroups = (args?: Partial<IGetGroupsArgs>) => {
  const { options, request } = args || {};

  return useQuery({
    queryKey: GROUPS_KEYS.list({ ...request }),
    queryFn: () => groupService.getGroups({ ...request }),
    retry: 0,
    ...(options || {}),
  });
};
