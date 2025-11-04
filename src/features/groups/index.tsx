'use client';

import * as React from 'react';
import { IconPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { GroupList } from '@/features/groups/section/group-list';

import { CreateGroupDrawer } from './components/create-group-drawer';
import { InviteMemberDrawer } from './components/invite-member-drawer';

const GroupsPage = () => {
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = React.useState(false);
  const [isInviteDrawerOpen, setIsInviteDrawerOpen] = React.useState(false);

  return (
    <React.Suspense>
      <div className="flex flex-1 flex-col">
        <div className="@container/main">
          <div className="px-4 py-4 md:py-6 lg:px-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold">Groups</CardTitle>
                    <p className="text-muted-foreground">
                      Kelola grup keuangan Anda
                    </p>
                  </div>
                  <Button onClick={() => setIsCreateDrawerOpen(true)}>
                    <IconPlus className="mr-2 size-4" />
                    Buat Grup Baru
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <GroupList />
              </CardContent>
            </Card>
          </div>
        </div>

        <CreateGroupDrawer
          open={isCreateDrawerOpen}
          onOpenChange={setIsCreateDrawerOpen}
        />

        <InviteMemberDrawer
          open={isInviteDrawerOpen}
          onOpenChange={setIsInviteDrawerOpen}
        />
      </div>
    </React.Suspense>
  );
};

export default GroupsPage;
