import { useMutation } from '@tanstack/react-query';

import {
  forgotPasswordService,
  IForgotPasswordUserArgs,
} from '@/features/forgot-password/services';

export const useForgotPassword = (
  mutationOption?: IForgotPasswordUserArgs['mutationOption'],
) => {
  return useMutation({
    mutationFn: (variables) =>
      forgotPasswordService.forgotPasswordUser(variables),
    ...(mutationOption || {}),
  });
};
