"use client";

import * as React from "react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Loader2 } from "lucide-react";

// --- Types ---

export interface ChartViewOption {
  /** Unique value for the select dropdown */
  value: string;
  /** Label to display in the dropdown */
  label: string;
  /** Optional icon to display next to the label */
  icon?: LucideIcon | React.ElementType;
  /** The actual component to render when this option is selected */
  content: React.ReactNode;
}

export interface ChartSwitcherCardProps {
  title: string;
  description?: string;
  /** List of chart views to switch between */
  options: ChartViewOption[];
  /** The 'value' of the option to show by default. If omitted, uses the first option. */
  defaultOption?: string;
  className?: string;
  contentClassName?: string; // For specific styling of the content area (e.g. height)
}

// --- Main Component ---

export function ChartSwitcherCard({
  title,
  description,
  options,
  defaultOption,
  className,
  contentClassName,
}: ChartSwitcherCardProps) {
  // Initialize state with defaultOption or the first option's value
  const [currentViewValue, setCurrentViewValue] = useState<string>(
    defaultOption || options[0]?.value || ""
  );

  if (!options || options.length === 0) {
    return null;
  }

  // Find the currently selected view object
  const currentView =
    options.find((opt) => opt.value === currentViewValue) || options[0];

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-col gap-2 space-y-0 pb-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <CardTitle className="line-clamp-1 text-sm font-medium capitalize lg:text-base">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-xs">{description}</CardDescription>
          )}
        </div>

        {/* View Switcher */}
        <div className="w-full max-w-xs lg:w-[180px]">
          <Select value={currentViewValue} onValueChange={setCurrentViewValue}>
            <SelectTrigger className="h-8 w-full text-xs">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex items-center text-xs">
                    {opt.icon && (
                      <opt.icon className="mr-2 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="line-clamp-1">{opt.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className={cn("pt-4", contentClassName)}>
        {/* Render the selected content */}
        <div className="w-full animate-in fade-in-50 duration-300">
          {currentView?.content}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Loading State Component ---

export const ChartSwitcherLoading = ({ height = 350 }: { height?: number }) => (
  <Card className="w-full border-none drop-shadow-sm">
    <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-full lg:w-[120px]" />
    </CardHeader>
    <CardContent>
      <div
        className="flex w-full items-center justify-center bg-muted/10"
        style={{ height }}
      >
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    </CardContent>
  </Card>
);

// --- Usage Example (You can copy this logic to your parent component) ---


import { Pyramid, Radar, AreaChart } from "lucide-react";

export const MyGradePage = ({ data }: { data: any[] }) => {
  const chartOptions: ChartViewOption[] = [
    {
      value: "pyramid",
      label: "Pyramid Chart",
      icon: AreaChart,
      content: (
        <div className="bg-accent-foreground aspect-video">
          {/* <PyramidChart2 data={data} /> */}
          chart 1
        </div>
      ),
    },
    {
      value: "bar",
      label: "Bar Chart",
      icon: Pyramid,
      content: (
        <div className="bg-zinc-400 aspect-video">
          {/* <PyramidChart data={data} /> */}
          chart 2
        </div>
      ),
    },
    {
      value: "line",
      label: "Line Chart",
      icon: Radar,
      content: (
        <div className="bg-amber-700 aspect-video">
          {/* <ChartLineMultiple data={data} /> */}
          chart 3
        </div>

      ),
    },
  ];
  return (
    <ChartSwitcherCard
      title="Grade wise Onsite/Offshore"
      options={chartOptions}
      defaultOption="pyramid"
    />
  );
};
