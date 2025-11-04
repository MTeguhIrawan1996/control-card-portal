import * as React from 'react';
import { IconEdit, IconTrash, IconUserPlus } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';

import { PAGE_KEY, PER_PAGE_KEY, useDataTable } from '@/hooks/use-data-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useGetGroups } from '@/features/groups/hooks';
import { IGroupsResponse } from '@/features/groups/services';

import { DataTable } from '@/shared/data-table/data-table';

export const GroupList = () => {
  const [page] = useQueryState(PAGE_KEY, parseAsInteger.withDefault(1));
  const [perPage] = useQueryState(PER_PAGE_KEY, parseAsInteger.withDefault(10));

  const { data, isPending } = useGetGroups({
    request: { page, page_size: perPage },
  });

  const columns = React.useMemo<ColumnDef<IGroupsResponse>[]>(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Name',
      },
      {
        id: 'mem.memberCount',
        accessorKey: 'mem.memberCount',
        header: 'Members',
        cell: ({ cell }) => <div>{cell.row.original.memberCount} Member</div>,
      },
      {
        id: 'role',
        accessorKey: 'gro.groupMember',
        header: 'Role',
        cell: ({ cell }) => (
          <Badge
            variant={
              cell.row.original.groupMember.role === 'admin'
                ? 'default'
                : 'secondary'
            }
          >
            {cell.row.original.groupMember.role === 'admin'
              ? 'Admin'
              : 'Member'}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="w-full text-right">Actions</div>,
        cell: () => (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <IconUserPlus className="size-4" />
            </Button>
            <Button variant="outline" size="sm">
              <IconEdit className="size-4" />
            </Button>
            <Button variant="outline" size="sm">
              <IconTrash className="size-4" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const { table } = useDataTable({
    data: data?.data || [],
    columns,
    pageCount: data?.meta.page_count || 1,
    getRowId: (row) => row.id,
    manualPagination: true,
  });

  return <DataTable isLoading={isPending} table={table} />;
};
