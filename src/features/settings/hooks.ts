import { useMutation } from '@tanstack/react-query';

import { IProfileArgs, settingService } from '@/features/settings/services';

export const useUpdateProfile = (
  mutationOption?: IProfileArgs['mutationOption'],
) => {
  return useMutation({
    mutationFn: (variables) => settingService.updateProfile(variables),
    ...(mutationOption || {}),
  });
};
