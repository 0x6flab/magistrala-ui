"use client";

import React, { useState } from "react";
import {
  AreaChart,
  ArrowRightToLine,
  BookUser,
  Building,
  Building2,
  Cpu,
  Home,
  Mail,
  Mails,
  MessagesSquare,
  Notebook,
  Radio,
  RadioTower,
  Users,
  Users2,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowSize } from "@uidotdev/usehooks";
import { Separator } from "@radix-ui/react-separator";
import { Nav } from "./ui/nav";

type Props = {};

export default function SideNavBar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const windowWidth = useWindowSize().width || 0;
  const mobileWidth = windowWidth < 768;

  return (
    <div className="relative min-w-[80px] border-r px-4 pb-10 pt-20 ">
      {!mobileWidth && (
        <div className="absolute top-7 right-[-20px]">
          <Button
            variant={"secondary"}
            className="rounded-full p-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ArrowRightToLine />
          </Button>
        </div>
      )}

      <Nav
        isCollapsed={mobileWidth ? true : !isCollapsed}
        links={[
          {
            title: "Home",
            icon: Home,
            variant: "default",
            href: "/",
          },
          {
            title: "Dashboards",
            icon: AreaChart,
            variant: "ghost",
            href: "/dashboards",
          },
        ]}
      />
      <Separator className="border-b border-gray-300" />
      <Nav
        isCollapsed={mobileWidth ? true : !isCollapsed}
        links={[
          {
            title: "Invitations",
            icon: Mails,
            variant: "ghost",
            href: "/invitations",
          },
          {
            title: "Domains",
            icon: Building2,
            variant: "ghost",
            href: "/domains",
          },
          {
            title: "Users",
            icon: Users,
            variant: "ghost",
            href: "/users",
          },
        ]}
      />
      <Separator className="border-b border-gray-300" />
      <Nav
        isCollapsed={mobileWidth ? true : !isCollapsed}
        links={[
          {
            title: "Groups",
            icon: BookUser,
            variant: "ghost",
            href: "/groups",
          },
          {
            title: "Things",
            icon: Cpu,
            variant: "ghost",
            href: "/things",
          },
          {
            title: "Channels",
            icon: Radio,
            variant: "ghost",
            href: "/channels",
          },
          {
            title: "Bootstrap",
            icon: RadioTower,
            variant: "ghost",
            href: "/bootstrap",
          },
        ]}
      />
    </div>
  );
}
