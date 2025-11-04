import * as React from 'react';
import { IconInnerShadowTop } from '@tabler/icons-react';

import { link } from '@/components/layout/dashboard/constan';
import { NavDocuments } from '@/components/layout/dashboard/elements/nav-documents';
import { NavMain } from '@/components/layout/dashboard/elements/nav-main';
import { NavUser } from '@/components/layout/dashboard/elements/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { getUser } from '@/services/server/getUser';

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const data = await getUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={link.navMain} />
        <NavDocuments items={link.master} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: data?.email || '',
            name: data?.full_name || '',
            avatar: data?.avatar_url || undefined,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
