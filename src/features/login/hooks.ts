import { useMutation } from '@tanstack/react-query';

import { ILoginUserArgs, loginService } from '@/features/login/services';

export const useLogin = (mutationOption?: ILoginUserArgs['mutationOption']) => {
  return useMutation({
    mutationFn: (variables) => loginService.loginUser(variables),
    ...(mutationOption || {}),
  });
};
