/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconFilter, IconX } from '@tabler/icons-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import * as z from 'zod';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const reportFilterFormSchema = z.object({
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  group: z.string(),
  category: z.string().optional(),
  account: z.string().optional(),
  type: z.string().optional(),
});

type ReportFilterFormValues = z.infer<typeof reportFilterFormSchema>;

const defaultValues: Partial<ReportFilterFormValues> = {
  dateRange: {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  },
  group: '',
  category: '',
  account: '',
  type: '',
};

export function ReportFilterDrawer({
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<ReportFilterFormValues>({
    resolver: zodResolver(reportFilterFormSchema),
    defaultValues,
  });

  function onSubmit(_data: ReportFilterFormValues) {
    // Handle form submission
    // console.log(data);
    onOpenChange(false);
  }

  return (
    <Drawer onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between">
          <div>
            <DrawerTitle>Filter Laporan</DrawerTitle>
            <DrawerDescription>
              Sesuaikan filter untuk melihat laporan keuangan Anda.
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
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Periode</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value?.from && 'text-muted-foreground',
                            )}
                          >
                            {field.value?.from ? (
                              format(field.value.from, 'PPP', { locale: id })
                            ) : (
                              <span>Dari</span>
                            )}
                            <div className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value?.from}
                          onSelect={(date) =>
                            field.onChange({
                              ...field.value,
                              from: date,
                            })
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          locale={id}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value?.to && 'text-muted-foreground',
                            )}
                          >
                            {field.value?.to ? (
                              format(field.value.to, 'PPP', { locale: id })
                            ) : (
                              <span>Sampai</span>
                            )}
                            <div className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value?.to}
                          onSelect={(date) =>
                            field.onChange({
                              ...field.value,
                              to: date,
                            })
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          locale={id}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori (Opsional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="makanan">Makanan & Minuman</SelectItem>
                      <SelectItem value="transport">Transportasi</SelectItem>
                      <SelectItem value="gaji">Gaji</SelectItem>
                      <SelectItem value="investasi">Investasi</SelectItem>
                      <SelectItem value="hiburan">Hiburan</SelectItem>
                      <SelectItem value="utilitas">Utilitas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Akun (Opsional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih akun" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bca">BCA Tabungan</SelectItem>
                      <SelectItem value="ovo">OVO</SelectItem>
                      <SelectItem value="cash">Cash Wallet</SelectItem>
                      <SelectItem value="mandiri">Mandiri Tabungan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe Transaksi (Opsional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Pemasukan</SelectItem>
                      <SelectItem value="expense">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DrawerFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            <IconFilter className="mr-2 size-4" />
            Terapkan Filter
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
