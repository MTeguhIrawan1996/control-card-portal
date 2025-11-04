'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

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
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/ui/password-input';

import { signInWithOAuth } from '@/features/login/actions';
import { useLogin } from '@/features/login/hooks';
import { LoginSchema, TLoginSchema } from '@/features/login/validation';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useLogin({
    onSuccess: () => {
      router.push('/overview');
      toast.success('Login berhasil');
    },
    onError: (err) => {
      toast.error('Login gagal', {
        description: err.message,
      });
    },
  });

  // const { mutate: mutateOAuth } = useLoginOAuth();

  function onSubmit(values: TLoginSchema) {
    mutate({ ...values });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Selamat Datang</CardTitle>
          <CardDescription>
            Masuk ke akun Financial Tracker Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() =>
                    signInWithOAuth({
                      provider: 'google',
                      nextUrl: '/overview',
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mr-2 size-4"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Masuk dengan Google
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Atau masuk dengan
                  </span>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-3">
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
                  </div>
                  <div className="grid gap-3">
                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                              href="/forgot-password"
                              className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                              Lupa password?
                            </Link>
                          </div>
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
                  </div>
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isPending}
                  >
                    Masuk
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Belum punya akun?{' '}
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Daftar
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Dengan mengklik lanjutkan, Anda menyetujui{' '}
        <Link href="#" className="underline">
          Ketentuan Layanan
        </Link>{' '}
        dan{' '}
        <Link href="#" className="underline">
          Kebijakan Privasi
        </Link>{' '}
        kami.
      </div>
    </div>
  );
}
