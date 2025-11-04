'use client';

import * as React from 'react';
import { IconDownload, IconFilter } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ReportFilterDrawer } from './components/report-filter-drawer';

const ReportsPage = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false);

  // Dummy data for chart
  const chartData = [
    { month: 'Jan', income: 15000000, expense: 10000000 },
    { month: 'Feb', income: 16000000, expense: 11000000 },
    { month: 'Mar', income: 14000000, expense: 9000000 },
    { month: 'Apr', income: 17000000, expense: 12000000 },
    { month: 'Mei', income: 15500000, expense: 10500000 },
    { month: 'Jun', income: 16500000, expense: 11500000 },
  ];

  const chartConfig = {
    income: {
      label: 'Pemasukan',
      color: 'var(--color-income)',
    },
    expense: {
      label: 'Pengeluaran',
      color: 'var(--color-expense)',
    },
  } satisfies ChartConfig;

  // Dummy data for summary
  const summaryData = [
    { label: 'Total Pemasukan', value: 'Rp 94.000.000', change: '+12.5%' },
    { label: 'Total Pengeluaran', value: 'Rp 65.000.000', change: '-5.2%' },
    { label: 'Saldo', value: 'Rp 29.000.000', change: '+8.3%' },
    { label: 'Rata-rata Bulanan', value: 'Rp 4.833.333', change: '+3.7%' },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Reports</h1>
                <p className="text-muted-foreground">
                  Lihat laporan keuangan Anda
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <IconDownload className="mr-2 size-4" />
                  Export
                </Button>
                <Button onClick={() => setIsFilterDrawerOpen(true)}>
                  <IconFilter className="mr-2 size-4" />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
              {summaryData.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardDescription>{item.label}</CardDescription>
                    <CardTitle className="text-2xl font-semibold">
                      {item.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{item.change}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Grafik Keuangan</CardTitle>
                    <CardDescription>
                      Pemasukan dan pengeluaran dalam 6 bulan terakhir
                    </CardDescription>
                  </div>
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Periode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">1 Bulan</SelectItem>
                      <SelectItem value="3months">3 Bulan</SelectItem>
                      <SelectItem value="6months">6 Bulan</SelectItem>
                      <SelectItem value="1year">1 Tahun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80 w-full">
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `Rp ${value / 1000000}jt`}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                      dataKey="income"
                      type="natural"
                      fill="var(--color-income)"
                      fillOpacity={0.4}
                      stroke="var(--color-income)"
                      stackId="a"
                    />
                    <Area
                      dataKey="expense"
                      type="natural"
                      fill="var(--color-expense)"
                      fillOpacity={0.4}
                      stroke="var(--color-expense)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Rekap Kategori</CardTitle>
                <CardDescription>
                  Pengeluaran berdasarkan kategori
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Pemasukan</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Gaji</span>
                        <span className="font-medium">Rp 75.000.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investasi</span>
                        <span className="font-medium">Rp 15.000.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lainnya</span>
                        <span className="font-medium">Rp 4.000.000</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Pengeluaran</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Makanan & Minuman</span>
                        <span className="font-medium">Rp 25.000.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transportasi</span>
                        <span className="font-medium">Rp 12.000.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hiburan</span>
                        <span className="font-medium">Rp 8.000.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investasi</span>
                        <span className="font-medium">Rp 10.000.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lainnya</span>
                        <span className="font-medium">Rp 10.000.000</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Ringkasan</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Pemasukan</span>
                        <span className="font-medium">Rp 94.000.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Pengeluaran</span>
                        <span className="font-medium">Rp 65.000.000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Saldo</span>
                        <span className="font-medium text-green-600">
                          Rp 29.000.000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ReportFilterDrawer
        open={isFilterDrawerOpen}
        onOpenChange={setIsFilterDrawerOpen}
      />
    </div>
  );
};

export default ReportsPage;
