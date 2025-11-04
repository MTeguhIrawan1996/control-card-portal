'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLock } from '@tabler/icons-react';
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

export const SecuritySetting = () => {
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
      toast.success('Update password berhasil');
    },
    onError: (err) => {
      toast.error('Update password gagal', {
        description: err.message,
      });
    },
  });

  const onSubmit: SubmitHandler<TPasswordSettingSchema> = ({ password }) => {
    mutate({ password });
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconLock className="size-5" />
          Keamanan
        </CardTitle>
        <CardDescription>Kelola keamanan akun Anda</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password Baru</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="confirmPassword">
                      Password Konfirmasi
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isPending}>
              Ubah password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
