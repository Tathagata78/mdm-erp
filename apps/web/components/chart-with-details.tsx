"use client";

import {
  BadgePercentIcon,
  ChartNoAxesCombinedIcon,
  CirclePercentIcon,
  DollarSignIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Bar, BarChart, Label, Pie, PieChart } from "recharts";

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

const salesPlanPercentage = 54;
const totalBars = 24;
const filledBars = Math.round((salesPlanPercentage * totalBars) / 100);

const salesChartData = Array.from({ length: totalBars }, (_, index) => {
  const date = new Date(2025, 5, 15);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return {
    date: formattedDate,
    sales: index < filledBars ? 315 : 0,
  };
});

const salesChartConfig = {
  sales: {
    label: "Sales",
  },
} satisfies ChartConfig;

const MetricsData = [
  {
    icons: <TrendingUpIcon className="size-5" />,
    title: "burdern cost",
    value: "$11,548",
    color: "oklch(0.56 0.13 43.00)",
  },
  {
    icons: <BadgePercentIcon className="size-5" />,
    title: "overhead cost",
    value: "$1,326",
    color: "oklch(0.69 0.16 290.41)",
  },
  {
    icons: <DollarSignIcon className="size-5" />,
    title: "Net profit",
    value: "$17,356",
    color: "oklch(0.59 0.17 253.06)",
  },
  {
    icons: <ShoppingBagIcon className="size-5" />,
    title: "Total orders",
    value: "248",
    color: "oklch(0.6 0.118 184.704)",
  },
];

const revenueChartData = [
  { month: "january", sales: 340, fill: "var(--color-january)" },
  { month: "february", sales: 200, fill: "var(--color-february)" },
  { month: "march", sales: 200, fill: "var(--color-march)" },
];

const revenueChartConfig = {
  sales: {
    label: "Sales",
  },
  january: {
    label: "January",
    color: "oklch(0.66 0.19 41.68)",
  },
  february: {
    label: "February",
    color: "oklch(0.70 0.12 183.20)",
  },
  march: {
    label: "March",
    color: "oklch(0.48 0.08 211.46)",
  },
} satisfies ChartConfig;

interface ChartWithDetailsProps {
  children: React.ReactNode;
  className?: string;
}

const ChartWithDetails = ({ children, className }: ChartWithDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-3xl dark:bg-accent">
        <DialogTitle className="pb-0">
          <span className="text-xl font-semibold">Sales metrics</span>
        </DialogTitle>
        <Card className={`border-0 shadow-none p-0 ${className}`}>
          <CardContent className="p-0">
            <div className="grid gap-4 lg:grid-cols-5 mb-4">
              <div className="flex flex-col gap-2 lg:col-span-3">
                <div className="flex items-center gap-3 border dark:border-gray-600 rounded-md p-2">
                  <img
                    src="https://cdn.shadcnstudio.com/ss-assets/logo/logo-square.png"
                    className="size-8.5 rounded-lg"
                    alt="logo"
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                      Chad Chhabil Das
                    </span>
                    <span className="text-muted-foreground text-xs">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </span>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {MetricsData.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-md border dark:border-gray-600 px-2 py-2"
                    >
                      <Avatar className="size-6.5 rounded-sm">
                        <AvatarFallback
                          className="bg-primary/10 text-primary shrink-0 rounded-sm size-5 p-1"
                          style={{
                            color: metric.color,
                            backgroundColor: `color-mix(in srgb, ${metric.color} 15%, transparent)`,
                          }}
                        >
                          {metric.icons}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-muted-foreground text-xs font-medium capitalize">
                          {metric.title}
                        </span>
                        <span className="text-sm font-medium">
                          {metric.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="py-4 shadow-none lg:col-span-2 rounded-md">
                {/* <CardHeader className="gap-0">
                  <CardTitle className="text-base font-semibold">
                    Revenue goal
                  </CardTitle>
                </CardHeader> */}

                <CardContent className="pt-2">
                  <div className="flex gap-2">
                    <div className="w-2/3">
                      <ChartContainer
                        config={revenueChartConfig}
                        className="h-30 w-full"
                      >
                        <PieChart
                          margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        >
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={revenueChartData}
                            dataKey="sales"
                            nameKey="month"
                            startAngle={300}
                            endAngle={660}
                            innerRadius={42}
                            outerRadius={60}
                            paddingAngle={2}
                          >
                            <Label
                              content={({ viewBox }) => {
                                if (
                                  viewBox &&
                                  "cx" in viewBox &&
                                  "cy" in viewBox
                                ) {
                                  return (
                                    <text
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                    >
                                      <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) - 12}
                                        className="fill-card-foreground text-sm font-medium"
                                      >
                                        256.24
                                      </tspan>
                                      <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) + 19}
                                        className="fill-muted-foreground text-xs"
                                      >
                                        Total Profit
                                      </tspan>
                                    </text>
                                  );
                                }
                              }}
                            />
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-center">
                      <div className="text-center">
                        <span className="text-sm block">Plan completed</span>
                        <span className="text-xl font-bold block mt-1">
                          56%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="shadow-none">
              <CardContent className="flex gap-2 px-3">
                <div className="flex flex-col gap-3 text-sm w-2/3">
                  <span className="font-medium capitalize">
                    Cohort analysis indicators
                  </span>
                  <span className="text-muted-foreground text-wrap text-xs italic">
                    Analyzes the behaviour of a group of users who joined a
                    product/service at the same time. over a certain period.
                  </span>
                  <div className="flex gap-6 justify-around">
                    <div className="flex items-center gap-2 ">
                      <ChartNoAxesCombinedIcon className="size-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-xs font-medium">
                        Open Statistics
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ">
                      <CirclePercentIcon className="size-4 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium">
                        Percentage Change
                      </span>
                    </div>
                  </div>

                  <ChartContainer
                    config={salesChartConfig}
                    className="h-6.75 w-full pt-1"
                  >
                    <BarChart
                      accessibilityLayer
                      data={salesChartData}
                      margin={{
                        left: 0,
                        right: 0,
                      }}
                      maxBarSize={16}
                    >
                      <Bar
                        dataKey="sales"
                        fill="oklch(0.84 0.17 85.07)"
                        background={{
                          fill: "oklch(0.92 0.04 83.86)",
                          radius: 12,
                        }}
                        radius={12}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="flex flex-col justify-between text-center w-1/3">
                  <span className="text-base font-semibold">Sales plan</span>
                  <span className="text-muted-foreground italic text-xs">
                    Percentage profit from total sales
                  </span>
                  <span className="text-4xl font-bold text-green-500">
                    {salesPlanPercentage}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ChartWithDetails;
