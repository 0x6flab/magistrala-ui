"use client";

import React from "react";
import { faker } from "@faker-js/faker";
import { statuses } from "@/components/ui/data-table-schema";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import { Badge } from "@/components/ui/badge";
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

const tags = ["occaecat", "nostrud", "commodo", "commodo", "ex", "nisi", "ad"];

const things = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  tags: faker.helpers.shuffle(tags).slice(0, 3),
  metadata: metadata,
  createdAt: faker.date.recent(),
  status: faker.helpers.arrayElement(statuses).value,
}));

const thingSchema = z.object({
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  metadata: z.object({}),
  createdAt: z.date(),
  status: z.string(),
});

type Thing = z.infer<typeof thingSchema>;

const columns: ColumnDef<Thing>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="text-sm px-4">{row.getValue("id")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
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
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      if (!tags) {
        return null;
      }
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="rounded-sm px-1 font-normal text-xs"
              >
                {tag}
              </Badge>
            ))}
          </span>
        </div>
      );
    },
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

export default function ThingsPage({}: Props) {
  return (
    <DataTableCard name="Things" data={things} columns={columns} />
  );
}
