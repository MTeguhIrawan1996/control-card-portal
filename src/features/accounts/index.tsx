/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import {
  IconBuildingBank,
  IconCash,
  IconCreditCard,
  IconEdit,
  IconPlus,
  IconTrash,
  IconWallet,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CreateAccountDrawer } from './components/create-account-drawer';

const AccountsPage = () => {
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = React.useState(false);

  // Dummy data for accounts
  const accounts = [
    {
      id: 1,
      name: 'BCA Tabungan',
      type: 'bank',
      balance: 15000000,
      currency: 'IDR',
      group: 'Keluarga',
    },
    {
      id: 2,
      name: 'OVO',
      type: 'ewallet',
      balance: 2500000,
      currency: 'IDR',
      group: 'Keluarga',
    },
    {
      id: 3,
      name: 'Cash Wallet',
      type: 'cash',
      balance: 500000,
      currency: 'IDR',
      group: 'Keluarga',
    },
    {
      id: 4,
      name: 'Mandiri Tabungan',
      type: 'bank',
      balance: 25000000,
      currency: 'IDR',
      group: 'Project Kantor',
    },
  ];

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <IconBuildingBank className="size-4" />;
      case 'ewallet':
        return <IconWallet className="size-4" />;
      case 'cash':
        return <IconCash className="size-4" />;
      default:
        return <IconCreditCard className="size-4" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Accounts</h1>
                <p className="text-muted-foreground">
                  Kelola akun keuangan Anda
                </p>
              </div>
              <Button onClick={() => setIsCreateDrawerOpen(true)}>
                <IconPlus className="mr-2 size-4" />
                Tambah Akun
              </Button>
            </div>
          </div>

          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Akun</CardTitle>
                <CardDescription>
                  Kelola akun keuangan Anda di berbagai grup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Akun</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Saldo</TableHead>
                      <TableHead>Grup</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getAccountIcon(account.type)}
                            {account.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{account.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(account.balance, account.currency)}
                        </TableCell>
                        <TableCell>{account.group}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <IconEdit className="size-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <IconTrash className="size-4" />
                            </Button>
                          </div>
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

      <CreateAccountDrawer
        // open={isCreateDrawerOpen}
        onOpenChange={setIsCreateDrawerOpen}
      />
    </div>
  );
};

export default AccountsPage;
