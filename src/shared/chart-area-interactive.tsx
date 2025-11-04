'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '@/hooks/use-mobile';

import {
  Card,
  CardAction,
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const description = 'An interactive area chart';

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

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('6months');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('3months');
    }
  }, [isMobile]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Grafik Keuangan</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Pemasukan dan pengeluaran dalam 6 bulan terakhir
          </span>
          <span className="@[540px]/card:hidden">6 bulan terakhir</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="3months">3 Bulan</ToggleGroupItem>
            <ToggleGroupItem value="6months">6 Bulan</ToggleGroupItem>
            <ToggleGroupItem value="1year">1 Tahun</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="6 Bulan" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="3months" className="rounded-lg">
                3 Bulan
              </SelectItem>
              <SelectItem value="6months" className="rounded-lg">
                6 Bulan
              </SelectItem>
              <SelectItem value="1year" className="rounded-lg">
                1 Tahun
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
              stroke="var(--color-expense)"
              stackId="a"
            />
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
