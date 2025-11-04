import { useMutation } from '@tanstack/react-query';

import {
  IPasswordSettingArgs,
  passwordSetting,
} from '@/services/client/password-setting';

export const useUpdatePassword = (
  mutationOption?: IPasswordSettingArgs['mutationOption'],
) => {
  return useMutation({
    mutationFn: (variables) => passwordSetting.updatePassword(variables),
    ...(mutationOption || {}),
  });
};
