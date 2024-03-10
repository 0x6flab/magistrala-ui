import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  value: string;
  description: string;
};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-1">
        {/* label */}
        <p className="text-smn text-gray-600">
          {props.label}
        </p>
        {/* icon */}
        <props.icon className="w-8 h-8 text-gray-600" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">
          {props.value}
        </h2>
        {props.description.includes("+") ? (
          <p className="text-xs text-green-600">{props.description}</p>
        ) : (
          <p className="text-xs text-red-600">{props.description}</p>
        )}
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col gap-3 p-5 bg-white rounded-xl shadow-md w-full border-2",
        props.className
      )}
    ></div>
  );
}
