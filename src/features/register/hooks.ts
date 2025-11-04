import { useMutation } from '@tanstack/react-query';

import {
  IRegisterUserArgs,
  registerService,
} from '@/features/register/services';

export const useRegister = (
  mutationOption?: IRegisterUserArgs['mutationOption'],
) => {
  return useMutation({
    mutationFn: (variables) => registerService.registerUser(variables),
    ...(mutationOption || {}),
  });
};
