/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconBuildingBank,
  IconCash,
  IconCreditCard,
  IconWallet,
  IconX,
} from '@tabler/icons-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Nama akun harus terdiri dari minimal 2 karakter.',
    })
    .max(30, {
      message: 'Nama akun tidak boleh lebih dari 30 karakter.',
    }),
  type: z.string(),
  initialBalance: z.string().min(1),
  currency: z.string(),
  group: z.string(),
  description: z
    .string()
    .max(160, {
      message: 'Deskripsi tidak boleh lebih dari 160 karakter.',
    })
    .optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  name: '',
  initialBalance: '0',
  description: '',
};

export function CreateAccountDrawer({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(_data: AccountFormValues) {
    // Handle form submission
    // console.log(data);
    onOpenChange(false);
  }

  return (
    <Drawer onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between">
          <div>
            <DrawerTitle>Tambah Akun Baru</DrawerTitle>
            <DrawerDescription>
              Tambahkan akun keuangan baru untuk melacak transaksi Anda.
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
                  <FormLabel>Nama Akun</FormLabel>
                  <FormControl>
                    <Input placeholder="BCA Tabungan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nama yang akan ditampilkan untuk akun ini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe Akun</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe akun" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bank">
                        <div className="flex items-center gap-2">
                          <IconBuildingBank className="size-4" />
                          Bank
                        </div>
                      </SelectItem>
                      <SelectItem value="ewallet">
                        <div className="flex items-center gap-2">
                          <IconWallet className="size-4" />
                          E-Wallet
                        </div>
                      </SelectItem>
                      <SelectItem value="cash">
                        <div className="flex items-center gap-2">
                          <IconCash className="size-4" />
                          Tunai
                        </div>
                      </SelectItem>
                      <SelectItem value="credit">
                        <div className="flex items-center gap-2">
                          <IconCreditCard className="size-4" />
                          Kartu Kredit
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initialBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saldo Awal</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mata Uang</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih mata uang" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IDR">IDR (Rp)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grup</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih grup" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="keluarga">Keluarga</SelectItem>
                      <SelectItem value="bisnis">Bisnis</SelectItem>
                      <SelectItem value="investasi">Investasi</SelectItem>
                    </SelectContent>
                  </Select>
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
                      placeholder="Tambahkan catatan tentang akun ini (opsional)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DrawerFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Simpan Akun
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
