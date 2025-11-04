'use client';

import * as React from 'react';
import {
  IconFilter,
  IconPlus,
  IconSearch,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CreateTransactionDrawer } from './components/create-transaction-drawer';

const TransactionsPage = () => {
  const [, setIsCreateDrawerOpen] = React.useState(false);

  // Dummy data for transactions
  const transactions = [
    {
      id: 1,
      date: '2023-06-15',
      description: 'Gaji Bulanan',
      amount: 15000000,
      type: 'income',
      account: 'BCA Tabungan',
      category: 'Gaji',
      group: 'Keluarga',
    },
    {
      id: 2,
      date: '2023-06-10',
      description: 'Belanja Bulanan',
      amount: -2500000,
      type: 'expense',
      account: 'OVO',
      category: 'Makanan & Minuman',
      group: 'Keluarga',
    },
    {
      id: 3,
      date: '2023-06-05',
      description: 'Transport ke Kantor',
      amount: -50000,
      type: 'expense',
      account: 'Cash Wallet',
      category: 'Transportasi',
      group: 'Keluarga',
    },
    {
      id: 4,
      date: '2023-06-01',
      description: 'Investasi Reksa Dana',
      amount: -1000000,
      type: 'expense',
      account: 'Mandiri Tabungan',
      category: 'Investasi',
      group: 'Investasi Bareng',
    },
  ];

  const formatCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return amount >= 0
      ? formatter.format(amount)
      : `- ${formatter.format(Math.abs(amount))}`;
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Transactions</h1>
                <p className="text-muted-foreground">
                  Kelola transaksi keuangan Anda
                </p>
              </div>
              <Button onClick={() => setIsCreateDrawerOpen(true)}>
                <IconPlus className="mr-2 size-4" />
                Tambah Transaksi
              </Button>
            </div>
          </div>

          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Filter Transaksi</CardTitle>
                <CardDescription>
                  Gunakan filter untuk mencari transaksi spesifik
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="relative">
                    <IconSearch className="text-muted-foreground absolute top-2.5 left-2 size-4" />
                    <Input placeholder="Cari deskripsi..." className="pl-8" />
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih grup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keluarga">Keluarga</SelectItem>
                      <SelectItem value="kantor">Project Kantor</SelectItem>
                      <SelectItem value="investasi">
                        Investasi Bareng
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="makanan">Makanan & Minuman</SelectItem>
                      <SelectItem value="transport">Transportasi</SelectItem>
                      <SelectItem value="gaji">Gaji</SelectItem>
                      <SelectItem value="investasi">Investasi</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <IconFilter className="mr-2 size-4" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Transaksi</CardTitle>
                <CardDescription>
                  Riwayat transaksi keuangan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Akun</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-right">Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.date}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {transaction.description}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {transaction.group}
                          </div>
                        </TableCell>
                        <TableCell>{transaction.account}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {transaction.amount >= 0 ? (
                            <div className="flex items-center justify-end gap-1">
                              <IconTrendingUp className="size-4" />
                              {formatCurrency(transaction.amount)}
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              <IconTrendingDown className="size-4" />
                              {formatCurrency(transaction.amount)}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CreateTransactionDrawer
        // open={isCreateDrawerOpen}
        onOpenChange={setIsCreateDrawerOpen}
      />
    </div>
  );
};

export default TransactionsPage;
