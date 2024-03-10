import BarChart, { BarChartProps } from "@/components/BarChart";
import Card, { CardContent, CardProps } from "@/components/Card";
import EventsCard, { EventsProps } from "@/components/EventsCard";
import PageTitle from "@/components/PageTitle";
import {
  Activity,
  BookUser,
  Cpu,
  CpuIcon,
  CreditCard,
  DollarSign,
  MailOpen,
  Radio,
  Send,
  UserRoundCheck,
  Users,
} from "lucide-react";
import Image from "next/image";

const cardData: CardProps[] = [
  {
    label: "Total Users",
    value: "167",
    description: "+20 from last month",
    icon: Users,
  },
  {
    label: "Active Users",
    value: "45",
    description: "+11 from last hour",
    icon: UserRoundCheck,
  },
  {
    label: "Total Things",
    value: "89,817",
    description: "+180 from last month",
    icon: Cpu,
  },
  {
    label: "Active Things",
    value: "817",
    description: "-180 from last hour",
    icon: Cpu,
  },
  {
    label: "Total Groups",
    value: "12,234",
    description: "+19 from last month",
    icon: BookUser,
  },
  {
    label: "Total Channels",
    value: "+573",
    description: "+2 since last month",
    icon: Radio,
  },
  {
    label: "No. of Messages Received",
    value: "134,900,000",
    description: "+18k from last hour",
    icon: MailOpen,
  },
  {
    label: "No. of Messages Sent",
    value: "134,900,000",
    description: "+18k from last hour",
    icon: Send,
  },
];

const barGraphData: BarChartProps = {
  data: [
    {
      name: "Users",
      enabled: Math.floor(Math.random() * 1000) + 100,
      disabled: Math.floor(Math.random() * 100) + 100,
    },
    {
      name: "Things",
      enabled: Math.floor(Math.random() * 1000) + 100,
      disabled: Math.floor(Math.random() * 100) + 100,
    },
    {
      name: "Channels",
      enabled: Math.floor(Math.random() * 1000) + 100,
      disabled: Math.floor(Math.random() * 100) + 100,
    },
    {
      name: "Groups",
      enabled: Math.floor(Math.random() * 1000) + 100,
      disabled: Math.floor(Math.random() * 100) + 100,
    },
  ],
};

const eventsData: EventsProps[] = [
  {
    name: "Olivia Martin",
    event: "Created 2 new groups",
    time: "2024-Feb-12 12:00 PM"
  },
  {
    name: "Jackson Lee",
    event: "Updated group magnolia",
    time: "2024-Feb-12 12:00 PM"
  },
  {
    name: "Isabella Nguyen",
    event: "Deleted channel saepe",
    time: "2024-Feb-12 12:00 PM"
  },
  {
    name: "William Kim",
    event: "Connected thing ducimus to channel saepe",
    time: "2024-Feb-12 12:00 PM"
  },
  {
    name: "Sofia Davis",
    event: "Disconnected thing ducimus from channel saepe",
    time: "2024-Feb-12 12:00 PM"
  }
];

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title="Dashboard" />
        <section className="grid w-full grid-cols-1 gap-5 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
          {cardData.map((data, index) => (
            <Card
              key={index}
              label={data.label}
              value={data.value}
              description={data.description}
              icon={data.icon}
            />
          ))}
        </section>
        <section className="grid grid-cols-1 gap-10 gap-x-8 transition-all lg:grid-cols-1">
          <CardContent>
            <p className="p-4 text-lg font-semibold">Overview</p>
            <BarChart data={barGraphData.data} />
          </CardContent>
          <CardContent>
            <section>
              <p className="text-lg font-semibold">Recent Events</p>
              <p className="text-sm text-gray-400">
                The most recent events in your organization
              </p>
            </section>
            {eventsData.map((d, i) => (
              <EventsCard
                key={i}
                event={d.event}
                name={d.name}
                time={d.time}
              />
            ))}
          </CardContent>
        </section>
      </div>
    </main>
  );
}
