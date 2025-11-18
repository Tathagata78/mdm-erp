"use client";

import { LineChart, Line, XAxis } from "recharts";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import { Button } from "@workspace/ui/components/button";

type RevenueCardProps = {
  revenueChartConfig?: any;
  revenueChartData?: any[];
  compareLabel?: string;
  total?: string | number;
  percentChange?: string | number;
};

export function RevenueCard({
  revenueChartConfig = {},
  revenueChartData = [],
  compareLabel = "since last year",
  total = "—",
  percentChange = "+0%",
}: RevenueCardProps) {
  const percentStr =
    typeof percentChange === "number"
      ? `${percentChange}%`
      : String(percentChange || "").trim();

  const numeric = parseFloat(percentStr.replace(/[%+]/g, ""));
  const isPositive =
    !percentStr.startsWith("-") && !Number.isNaN(numeric) && numeric >= 0;

  return (
    <Dialog>
      <Card className="col-span-1 xl:col-span-2">
        <CardHeader className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Year to Date (YTD)</CardDescription>
          </div>

          <DialogTrigger asChild className="p-0">
            <Button variant={"ghost"} className="cursor-pointer">
              <ZoomIn />
            </Button>
          </DialogTrigger>
        </CardHeader>

        <CardContent className="pb-2">
          <ChartContainer config={revenueChartConfig} className="h-28 w-full">
            <LineChart
              data={revenueChartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="revenue"
                stroke="var(--color-revenue)"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex items-center justify-between px-4 pt-2">
          <span
            className={`text-xl font-semibold tabular-nums ${isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {percentStr}
          </span>

          <span className="text-muted-foreground text-sm">{compareLabel}</span>
        </CardFooter>
      </Card>

      <DialogContent className="bg-accent min-w-fit">
        <DialogHeader>
          <DialogTitle>Revenue Growth — Detailed View</DialogTitle>
          <DialogDescription>
            Year to date revenue breakdown and trends.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          className="mt-0 h-[320px]"
          initial={{ opacity: 0, scale: 0.94, x: 0 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.94, x: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ transformOrigin: "center center" }}
        >
          <ChartContainer className="size-full" config={revenueChartConfig}>
            <LineChart
              data={revenueChartData}
              margin={{
                top: 8,
                right: 8,
                left: 8,
                bottom: 0,
              }}
            >
              <XAxis dataKey="month" tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="revenue"
                stroke="var(--color-revenue)"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </motion.div>

        <div className="mt-4 w-full grid grid-cols-3 gap-4 text-sm items-center text-center">
          <div>
            <p className="text-xs text-muted-foreground">YTD revenue</p>
            <p className="text-lg font-semibold tabular-nums">{total}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Peak month</p>
            <p className="text-lg font-semibold">—</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Change</p>
            <p className="text-lg font-semibold text-green-500">{percentStr}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RevenueCard;
