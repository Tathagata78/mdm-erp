"use client";

import { AreaChart, Area, XAxis } from "recharts";
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
import {TrendingDown, TrendingUp} from "lucide-react";

type ProposalsCardProps = {
  proposalsChartConfig: any;
  proposalsChartData: any[];
  lastMonth: string;
};

export function ProposalsCardModal({
  proposalsChartConfig,
  proposalsChartData,
  lastMonth,
}: ProposalsCardProps) {
  return (
    <Dialog>
      <Card className="overflow-hidden">
        <CardHeader className="flex items-center justify-between gap-2 px-2 pl-5">
          <div>
            <CardTitle>Proposals Sent</CardTitle>
            <CardDescription>Last Month</CardDescription>
          </div>

          <DialogTrigger asChild>
            <Button variant={"ghost"} className="cursor-pointer">
              <ZoomIn />
            </Button>
          </DialogTrigger>
        </CardHeader>

        <CardContent className="flex-1 px-2">
          <ChartContainer
            className="size-full min-h-20 px-0 pb-4 pt-0"
            config={proposalsChartConfig}
          >
            <AreaChart
              data={proposalsChartData}
              margin={{
                left: 0,
                right: 0,
                top: 5,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `${lastMonth}: ${label}`}
                    hideIndicator
                  />
                }
              />
              <Area
                dataKey="proposalsSent"
                fill="var(--color-proposalsSent)"
                fillOpacity={0.05}
                stroke="var(--color-proposalsSent)"
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex items-center justify-between px-4">
          <span className="text-xl font-semibold tabular-nums">1,240</span>
          <span className="text-sm font-medium text-green-500">+12.8%</span>
        </CardFooter>
      </Card>

      <DialogContent className="bg-accent min-w-fit">
        <DialogHeader>
          <DialogTitle>Proposals Sent — Detailed View</DialogTitle>
          <DialogDescription>
            Breakdown of {lastMonth.toLowerCase()} performance.
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
          <ChartContainer className="size-full" config={proposalsChartConfig}>
            <AreaChart
              data={proposalsChartData}
              margin={{
                left: 0,
                right: 0,
                top: 5,
              }}
            >
              <XAxis dataKey="date" tickMargin={10} />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `${lastMonth}: ${label}`}
                    hideIndicator
                  />
                }
              />

              <Area
                dataKey="proposalsSent"
                fill="var(--color-proposalsSent)"
                fillOpacity={0.05}
                stroke="var(--color-proposalsSent)"
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ChartContainer>
        </motion.div>

        <div className="mt-4 w-full grid grid-cols-3 gap-4 text-sm items-center text-center">
          <div>
            <p className="text-xs text-muted-foreground">Total proposals</p>
            <p className="text-lg font-semibold">1,240</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Declined</p>
            <p className="text-lg font-semibold">98</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Win rate</p>
            <p className="text-lg font-semibold text-green-500">+12.8%</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
