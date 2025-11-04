'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
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

import { useForgotPassword } from '@/features/forgot-password/hooks';
import {
  ForgotPasswordSchema,
  TForgotPasswordSchema,
} from '@/features/forgot-password/validation';

export function ForgotPasswordForm() {
  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending } = useForgotPassword({
    onSuccess: () => {
      form.reset();
      toast.success('Lupa password berhasil', {
        description: 'Silakan cek email untuk confirmasi',
      });
    },
    onError: (err) => {
      toast.error('Lupa password gagal', {
        description: err.message,
      });
    },
  });

  const onSubmit: SubmitHandler<TForgotPasswordSchema> = ({ email }) => {
    mutate({ email });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Lupa Password</CardTitle>
        <CardDescription>
          Masukkan alamat email Anda untuk menerima tautan reset password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
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

              <Button type="submit" className="w-full" disabled={isPending}>
                Kirim Tautan Reset
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
