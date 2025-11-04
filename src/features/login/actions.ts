'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { env } from '@/env';

interface ILoginAuthReq {
  provider: 'google';
  nextUrl?: string;
}

export async function signInWithOAuth(variables: ILoginAuthReq) {
  const { provider, nextUrl } = variables;
  const supabaseServer = await createClient();

  const { data, error } = await supabaseServer.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${env.NEXT_PUBLIC_BASE_URL}/callback?next=${nextUrl || '/overview'}`,
    },
  });

  if (error) throw error;

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
