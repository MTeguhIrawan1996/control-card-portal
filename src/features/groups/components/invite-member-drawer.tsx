/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { IconSend, IconX } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const defaultValues: Partial<any> = {
  email: '',
  message: '',
};

export function InviteMemberDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<any>({
    // resolver: zodResolver(inviteMemberFormSchema),
    defaultValues,
  });

  function onSubmit(_data: any) {
    // Handle form submission
    // console.log(data);
    onOpenChange(false);
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between">
          <div>
            <DrawerTitle>Undang Anggota</DrawerTitle>
            <DrawerDescription>
              Undang anggota baru ke grup keuangan Anda.
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <Button variant="outline" size="icon">
              <IconX className="size-4" />
              <span className="sr-only">Tutup</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Anggota</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@contoh.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan (Opsional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tambahkan pesan untuk anggota yang diundang..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Hak Akses</h3>
              <p className="text-muted-foreground text-sm">
                Anggota yang diundang akan memiliki hak akses sebagai berikut:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>Melihat transaksi grup</li>
                <li>Menambahkan transaksi baru</li>
                <li>Mengelola akun dan kategori grup</li>
              </ul>
            </div>
          </form>
        </Form>
        <DrawerFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            <IconSend className="mr-2 size-4" />
            Kirim Undangan
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
