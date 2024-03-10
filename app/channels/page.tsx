"use client";

import React from "react";
import { faker } from "@faker-js/faker";
import { statuses } from "@/components/ui/data-table-schema";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import JsonView from "@uiw/react-json-view";
import DataTableCard from "@/components/DataTable";

type Props = {};

const metadata = {
  isActive: false,
  balance: "$1,796.93",
  picture: "http://placehold.it/32x32",
  age: 40,
  eyeColor: "green",
  name: "Compton Forbes",
  gender: "male",
  company: "GEEKOL",
  email: "comptonforbes@geekol.com",
  phone: "+1 (916) 474-3207",
  address: "791 Middleton Street, Fairfield, Louisiana, 3812",
  about:
    "Et dolore in qui ex deserunt ullamco voluptate. Adipisicing nostrud veniam sunt velit sint deserunt cillum incididunt laborum duis nulla voluptate tempor. Nisi sunt pariatur id anim fugiat ut ipsum ex eiusmod eiusmod ea. Duis aliquip id veniam officia. Officia ullamco aliqua commodo nostrud reprehenderit veniam irure enim.\r\n",
  registered: "2020-04-14T08:33:28 -03:00",
  latitude: -56.982761,
  longitude: 49.831669,
  tags: ["occaecat", "nostrud", "commodo", "commodo", "ex", "nisi", "ad"],
  friends: [
    {
      id: 0,
      name: "Robbins Sexton",
    },
    {
      id: 1,
      name: "Tracy Sweet",
    },
    {
      id: 2,
      name: "Tonia Macias",
    },
  ],
  greeting: "Hello, Compton Forbes! You have 5 unread messages.",
  favoriteFruit: "apple",
};

const channels = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  description: faker.lorem.sentence(),
  metadata: metadata,
  createdAt: faker.date.recent(),
  status: faker.helpers.arrayElement(statuses).value,
}));

const channelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  metadata: z.object({}),
  createdAt: z.date(),
  status: z.string(),
});

type Channel = z.infer<typeof channelSchema>;

const columns: ColumnDef<Channel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="text-sm px-4">{row.getValue("name")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="text-sm px-4">{row.getValue("description")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          {
            status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground"
                color={row.getValue("status") === "enabled" ? "green" : "red"}
               />
            )
          }
          <p className="text-center">{status.label}</p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "metadata",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Metadata" />
    ),
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Metadata</Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>Metadata</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <JsonView value={row.getValue("metadata")} />
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export default function ChannelsPage({}: Props) {
  return (
    <DataTableCard name="Channels" data={channels} columns={columns} />
  );
}
