import * as React from 'react';

import { dummyTransactions } from '@/lib/constan/dummy';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ChartAreaInteractive } from '@/shared/chart-area-interactive';
import { DataTable } from '@/shared/data-table';
import { SectionCards } from '@/shared/section-cards';

const OverviewPage = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>

          {/* Recent Transactions */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaksi Terbaru</CardTitle>
                <CardDescription>
                  Riwayat transaksi keuangan terakhir Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={dummyTransactions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
