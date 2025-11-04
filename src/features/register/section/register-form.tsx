'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { toast } from 'sonner';

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
import PasswordInput from '@/components/ui/password-input';

import { useRegister } from '@/features/register/hooks';
import {
  RegisterSchema,
  TRegisterSchema,
} from '@/features/register/validation';

export function RegisterForm() {
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate } = useRegister({
    onSuccess: () => {
      form.reset();
      toast.success('Pendaftaran berhasil', {
        description: 'Silakan cek email untuk confirmasi',
      });
    },
    onError: (err) => {
      toast.error('Pendaftaran gagal', {
        description: err.message,
      });
    },
  });

  function onSubmit(values: TRegisterSchema) {
    mutate({ ...values });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Daftar</CardTitle>
        <CardDescription>
          Buat akun baru dengan mengisi formulir di bawah ini.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {/* Name Field */}
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

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="johndoe@mail.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <Button type="submit" className="w-full cursor-pointer">
                Daftar
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun?{' '}
          <Link href="/login" className="underline">
            Masuk
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
