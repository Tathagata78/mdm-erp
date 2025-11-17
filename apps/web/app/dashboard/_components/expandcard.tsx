// "use client";

// import { BarChart, Bar, XAxis } from "recharts";
// import { motion } from "framer-motion";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@workspace/ui/components/card";

// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@workspace/ui/components/dialog";

// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@workspace/ui/components/chart";

// type LeadsCardProps = {
//   leadsChartConfig: any;
//   leadsChartData: any[];
//   lastMonth: string;
// };

// export function LeadsCardModal({
//   leadsChartConfig,
//   leadsChartData,
//   lastMonth,
// }: LeadsCardProps) {
//   return (
//     <Dialog>
//       <Card>
//         <CardHeader className="flex items-center justify-between gap-2">
//           <div>
//             <CardTitle>New Leads</CardTitle>
//             <CardDescription>Last Month</CardDescription>
//           </div>

//           {/* EXPAND TRIGGER */}
//           <DialogTrigger asChild>
//             <button className="text-xs font-medium text-primary underline-offset-4 hover:underline">
//               expand
//             </button>
//           </DialogTrigger>
//         </CardHeader>

//         <CardContent className="size-full">
//           <ChartContainer
//             className="size-full min-h-24"
//             config={leadsChartConfig}
//           >
//             <BarChart accessibilityLayer data={leadsChartData} barSize={8}>
//               <XAxis
//                 dataKey="date"
//                 tickLine={false}
//                 tickMargin={10}
//                 axisLine={false}
//                 hide
//               />

//               <ChartTooltip
//                 content={
//                   <ChartTooltipContent
//                     labelFormatter={(label) => `${lastMonth}: ${label}`}
//                   />
//                 }
//               />

//               <Bar
//                 background={{
//                   fill: "var(--color-background)",
//                   radius: 4,
//                   opacity: 0.07,
//                 }}
//                 dataKey="newLeads"
//                 stackId="a"
//                 fill="var(--color-newLeads)"
//               />
//               <Bar
//                 dataKey="disqualified"
//                 stackId="a"
//                 fill="var(--color-disqualified)"
//                 radius={[4, 4, 0, 0]}
//               />
//             </BarChart>
//           </ChartContainer>
//         </CardContent>

//         <CardFooter className="flex items-center justify-between">
//           <span className="text-xl font-semibold tabular-nums">635</span>
//           <span className="text-sm font-medium text-green-500">+54.6%</span>
//         </CardFooter>
//       </Card>

//       {/* MODAL CONTENT */}
//       <DialogContent className="max-w-3xl w-[90vw]">
//         <DialogHeader>
//           <DialogTitle>New Leads — Detailed View</DialogTitle>
//           <DialogDescription>
//             Breakdown of {lastMonth.toLowerCase()} performance.
//           </DialogDescription>
//         </DialogHeader>

//         {/* Framer Motion animation inside dialog */}
//         <motion.div
//           className="mt-4 h-[320px]"
//           initial={{ opacity: 0, scale: 0.96, y: 8 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.96, y: 8 }}
//           transition={{ duration: 0.18, ease: "easeOut" }}
//         >
//           <ChartContainer className="size-full" config={leadsChartConfig}>
//             <BarChart accessibilityLayer data={leadsChartData} barSize={16}>
//               <XAxis dataKey="date" tickMargin={10} />
//               <ChartTooltip
//                 content={
//                   <ChartTooltipContent
//                     labelFormatter={(label) => `${lastMonth}: ${label}`}
//                   />
//                 }
//               />
//               <Bar
//                 dataKey="newLeads"
//                 fill="var(--color-newLeads)"
//                 radius={[4, 4, 0, 0]}
//               />
//               <Bar
//                 dataKey="disqualified"
//                 fill="var(--color-disqualified)"
//                 radius={[4, 4, 0, 0]}
//               />
//             </BarChart>
//           </ChartContainer>
//         </motion.div>

//         <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
//           <div>
//             <p className="text-xs text-muted-foreground">Total leads</p>
//             <p className="text-lg font-semibold">635</p>
//           </div>
//           <div>
//             <p className="text-xs text-muted-foreground">Disqualified</p>
//             <p className="text-lg font-semibold">82</p>
//           </div>
//           <div>
//             <p className="text-xs text-muted-foreground">Conversion</p>
//             <p className="text-lg font-semibold text-green-500">+54.6%</p>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { BarChart, Bar, XAxis } from "recharts";
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

type LeadsCardProps = {
  leadsChartConfig: any;
  leadsChartData: any[];
  lastMonth: string;
};

export function LeadsCardModal({
  leadsChartConfig,
  leadsChartData,
  lastMonth,
}: LeadsCardProps) {
  return (
    <Dialog>
      {/* CARD */}
      <Card>
        <CardHeader className="flex items-center justify-between pr-2">
          <div>
            <CardTitle>New Leads</CardTitle>
            <CardDescription>Last Month</CardDescription>
          </div>

          {/* EXPAND BUTTON */}
          <DialogTrigger asChild className="p-0">
            {/* <button className="text-xs font-medium text-primary underline-offset-4 hover:underline">
              expand
            </button> */}
            <Button variant={"ghost"} className="cursor-pointer">
              <ZoomIn />
            </Button>
          </DialogTrigger>
        </CardHeader>

        <CardContent className="size-full">
          <ChartContainer
            className="size-full min-h-24"
            config={leadsChartConfig}
          >
            <BarChart accessibilityLayer data={leadsChartData} barSize={8}>
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
                  />
                }
              />

              <Bar
                background={{
                  fill: "var(--color-background)",
                  radius: 4,
                  opacity: 0.07,
                }}
                dataKey="newLeads"
                stackId="a"
                fill="var(--color-newLeads)"
              />

              <Bar
                dataKey="disqualified"
                stackId="a"
                fill="var(--color-disqualified)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <span className="text-xl font-semibold tabular-nums">635</span>
          <span className="text-sm font-medium text-green-500">+54.6%</span>
        </CardFooter>
      </Card>

      {/* MODAL CONTENT */}
      <DialogContent className="bg-accent min-w-fit">
        <DialogHeader>
          <DialogTitle>New Leads — Detailed View</DialogTitle>
          <DialogDescription>
            Breakdown of {lastMonth.toLowerCase()} performance.
          </DialogDescription>
        </DialogHeader>

        {/* ANIMATED EXPANDED CHART */}
        <motion.div
          className="mt-0 h-[320px]"
          initial={{ opacity: 0, scale: 0.94, x: 0 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.94, x: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ transformOrigin: "center center" }}
        >
          <ChartContainer className="size-full" config={leadsChartConfig}>
            <BarChart accessibilityLayer data={leadsChartData} barSize={16}>
              <XAxis dataKey="date" tickMargin={10} />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `${lastMonth}: ${label}`}
                  />
                }
              />

              <Bar
                dataKey="newLeads"
                fill="var(--color-newLeads)"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="disqualified"
                fill="var(--color-disqualified)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </motion.div>

        {/* SUMMARY GRID */}
        <div className="mt-4 w-full grid grid-cols-3 gap-4 text-sm items-center text-center">
          <div>
            <p className="text-xs text-muted-foreground">Total leads</p>
            <p className="text-lg font-semibold">635</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Disqualified</p>
            <p className="text-lg font-semibold">82</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Conversion</p>
            <p className="text-lg font-semibold text-green-500">+54.6%</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
