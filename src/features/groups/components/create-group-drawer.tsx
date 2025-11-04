/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconUserPlus, IconUsers, IconX } from '@tabler/icons-react';
import * as z from 'zod';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const groupFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Nama grup harus terdiri dari minimal 2 karakter.',
    })
    .max(30, {
      message: 'Nama grup tidak boleh lebih dari 30 karakter.',
    }),
  description: z
    .string()
    .max(160, {
      message: 'Deskripsi tidak boleh lebih dari 160 karakter.',
    })
    .optional(),
  members: z.array(z.string()).optional(),
});

type GroupFormValues = z.infer<typeof groupFormSchema>;

const defaultValues: Partial<GroupFormValues> = {
  name: '',
  description: '',
  members: [],
};

export function CreateGroupDrawer({
  onOpenChange,
  open,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues,
  });

  function onSubmit(_data: GroupFormValues) {
    // Handle form submission
    // console.log(data);
    onOpenChange(false);
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between">
          <div>
            <DrawerTitle>Buat Grup Baru</DrawerTitle>
            <DrawerDescription>
              Buat grup keuangan baru untuk berkolaborasi dengan orang lain.
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Grup</FormLabel>
                  <FormControl>
                    <Input placeholder="Keluarga Besar" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nama yang akan ditampilkan untuk grup ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tambahkan deskripsi tentang grup ini (opsional)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Anggota</h3>
                  <p className="text-muted-foreground text-sm">
                    Tambahkan anggota ke grup ini (opsional)
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm">
                  <IconUserPlus className="mr-2 size-4" />
                  Tambah Anggota
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="bg-muted flex items-center justify-between rounded-md p-2">
                  <div className="flex items-center gap-2">
                    <IconUsers className="size-4" />
                    <span>Anda (Admin)</span>
                  </div>
                  <span className="text-muted-foreground text-xs">Admin</span>
                </div>
              </div>
            </div>
          </form>
        </Form>
        <DrawerFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Buat Grup
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
