'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUser } from '@tabler/icons-react';
import { toast } from 'sonner';

import { invalidateTag } from '@/lib/helper/revalidate';
import { useOnSuccess } from '@/hooks/use-on-success';

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
import { Input } from '@/components/ui/input';

import { AvatarButton } from '@/features/settings/elements/avatar-button';
import { useUpdateProfile } from '@/features/settings/hooks';
import { ProfileSchema, TProfileSchema } from '@/features/settings/validation';

import { IProfileObj } from '@/services/server/get-user';

interface IProfileSetting {
  data?: IProfileObj | null;
}

export const ProfileSetting = ({ data }: IProfileSetting) => {
  const form = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullname: '',
      email: '',
      avatar: null,
      bio: '',
    },
  });

  const { mutate, isPending } = useUpdateProfile({
    onSuccess: () => {
      invalidateTag('profile');
      toast.success('Update profile berhasil');
    },
    onError: (err) => {
      toast.error('Update profile gagal', {
        description: err.message,
      });
    },
  });

  useOnSuccess({ data, isSuccess: !!data }, (val) => {
    form.setValue('fullname', val.full_name || '');
    form.setValue('email', val.email || '');
    form.setValue('bio', val.bio || '');
    form.setValue('avatar', null);
  });

  const onSubmit: SubmitHandler<TProfileSchema> = ({
    fullname,
    bio,
    avatar,
  }) => {
    mutate({
      id: data?.id || '',
      full_name: fullname,
      bio,
      avatar,
      avatar_path: data?.avatar_path,
    });
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconUser className="size-5" />
          Profil
        </CardTitle>
        <CardDescription>Kelola informasi profil Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormControl>
                    <AvatarButton
                      handleChange={field.onChange}
                      avatarServerSrc={data?.avatar_url || undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="fullname">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input id="fullname" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <FormControl>
                    <Input id="bio" type="bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Simpan Perubahan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
