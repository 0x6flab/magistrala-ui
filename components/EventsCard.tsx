import React from "react";

export type EventsProps = {
  name: string;
  event: string;
  time: string;
};

export default function EventsCard(props: EventsProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
            {props.event}
          </div>
        </div>
      </section>
      <p>{props.time}</p>
    </div>
  );
}
