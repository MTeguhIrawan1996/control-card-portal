'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  PasswordSettingSchema,
  TPasswordSettingSchema,
} from '@/lib/validation/password';
import { useUpdatePassword } from '@/hooks/mutations/update-password';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import PasswordInput from '@/components/ui/password-input';

export function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm<TPasswordSettingSchema>({
    resolver: zodResolver(PasswordSettingSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useUpdatePassword({
    onSuccess: () => {
      form.reset();
      toast.success('Reset password berhasil', {
        description: 'Silakan login kembali',
      });
      router.push('/login');
    },
    onError: (err) => {
      toast.error('Reset password gagal', {
        description: err.message,
      });
    },
  });

  const onSubmit: SubmitHandler<TPasswordSettingSchema> = ({ password }) => {
    mutate({ password });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Masukkan password baru Anda untuk mereset password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="******"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="confirmPassword">
                      Konfirmasi Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="******"
                        autoComplete="confirm-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Reset Password
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="underline">
            Kembali ke halaman login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
