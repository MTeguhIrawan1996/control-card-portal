'use client';

import * as React from 'react';
import {
  IconCategory,
  IconCoin,
  IconEdit,
  IconPlus,
  IconTrash,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { BudgetFormDrawer } from './components/budget-form-drawer';
import { CreateCategoryDrawer } from './components/create-category-drawer';

const CategoriesPage = () => {
  const [, setIsCreateDrawerOpen] = React.useState(false);
  const [isBudgetDrawerOpen, setIsBudgetDrawerOpen] = React.useState(false);

  // Dummy data for categories
  const categories = [
    {
      id: 1,
      name: 'Makanan & Minuman',
      type: 'expense',
      group: 'Keluarga',
    },
    {
      id: 2,
      name: 'Transportasi',
      type: 'expense',
      group: 'Keluarga',
    },
    {
      id: 3,
      name: 'Gaji',
      type: 'income',
      group: 'Keluarga',
    },
    {
      id: 4,
      name: 'Hiburan',
      type: 'expense',
      group: 'Keluarga',
    },
    {
      id: 5,
      name: 'Investasi',
      type: 'income',
      group: 'Investasi Bareng',
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Categories</h1>
                <p className="text-muted-foreground">
                  Kelola kategori transaksi Anda
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsBudgetDrawerOpen(true)}>
                  <IconCoin className="mr-2 size-4" />
                  Kelola Anggaran
                </Button>
                <Button onClick={() => setIsCreateDrawerOpen(true)}>
                  <IconPlus className="mr-2 size-4" />
                  Tambah Kategori
                </Button>
              </div>
            </div>
          </div>

          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Kategori</CardTitle>
                <CardDescription>
                  Kelola kategori transaksi untuk setiap grup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Grup</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <IconCategory className="size-4" />
                            {category.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              category.type === 'income'
                                ? 'default'
                                : 'destructive'
                            }
                          >
                            <div className="flex items-center gap-1">
                              {category.type === 'income' ? (
                                <IconTrendingUp className="size-3" />
                              ) : (
                                <IconTrendingDown className="size-3" />
                              )}
                              {category.type === 'income'
                                ? 'Pemasukan'
                                : 'Pengeluaran'}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>{category.group}</TableCell>
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

      <CreateCategoryDrawer
        // open={isCreateDrawerOpen}
        onOpenChange={setIsCreateDrawerOpen}
      />

      <BudgetFormDrawer
        open={isBudgetDrawerOpen}
        onOpenChange={setIsBudgetDrawerOpen}
      />
    </div>
  );
};

export default CategoriesPage;
