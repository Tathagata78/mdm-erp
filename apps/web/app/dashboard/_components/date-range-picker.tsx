"use client";

import * as React from "react";
import {
  addDays,
  format,
  startOfDay,
  endOfDay,
} from "date-fns";

import { CalendarIcon} from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Calendar } from "@workspace/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";

import type { DateRange } from "react-day-picker";

type Preset = {
  key: string;
  label: string;
  getRange: () => DateRange;
};
const presets: Preset[] = [
  {
    key: "D",
    label: "Today",
    getRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    }),
  },
  {
    key: "Y",
    label: "Yesterday",
    getRange: () => {
      const d = addDays(new Date(), -1);
      return { from: startOfDay(d), to: endOfDay(d) };
    },
  },
  {
    key: "H",
    label: "Last hour", // (Date-only UI — equivalent to "Today")
    getRange: () => ({
      from: new Date(),
      to: new Date(),
    }),
  },
  {
    key: "W",
    label: "Last 7 days",
    getRange: () => ({
      from: addDays(new Date(), -7),
      to: endOfDay(new Date()),
    }),
  },
  {
    key: "B",
    label: "Last 14 days",
    getRange: () => ({
      from: addDays(new Date(), -14),
      to: endOfDay(new Date()),
    }),
  },
  {
    key: "M",
    label: "Last 30 days",
    getRange: () => ({
      from: addDays(new Date(), -30),
      to: endOfDay(new Date()),
    }),
  },
];

export default function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const maxSelectableDate = React.useMemo(() => new Date(), []); // No future dates

  const [open, setOpen] = React.useState(false);

  // Committed = applied range
  const [committed, setCommitted] = React.useState<DateRange>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  // Draft = currently selecting
  const [draft, setDraft] = React.useState<DateRange>(committed);

  // Calendar month displayed
  const [month, setMonth] = React.useState<Date>(committed.from ?? new Date());

  // Sync draft when opening
  React.useEffect(() => {
    if (open) {
      setDraft(committed);
      setMonth(committed.from ?? new Date());
    }
  }, [open, committed, maxSelectableDate]);

  // Keyboard shortcuts
  React.useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      const preset = presets.find((p) => p.key.toLowerCase() === key);
      if (preset) {
        e.preventDefault();
        const r = preset.getRange();
        if (r.to && r.to > maxSelectableDate) r.to = maxSelectableDate;
        setDraft(r);
      }

      if (e.key === "Escape") {
        setDraft(committed);
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, committed, maxSelectableDate]);

  const label = committed?.from
    ? committed?.to
      ? `${format(committed.from, "LLL dd, y")} – ${format(
          committed.to,
          "LLL dd, y"
        )}`
      : format(committed.from, "LLL dd, y")
    : "Pick date range";

  const disableFuture = { after: maxSelectableDate };

  const toDateInput = (d?: Date) => (d ? format(d, "yyyy-MM-dd") : "");

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[260px] justify-center text-center font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[460px] p-0 rounded-xl border border-gray-200 shadow-none bg-white/2 backdrop-blur-lg backdrop-saturate-200 ring-1 ring-white/6"
        >
          <div className="flex">
            {/* ---------------------- LEFT PRESETS ---------------------- */}
            <div className="w-[200px] border-r p-4 flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-muted-foreground tracking-wider">
                DATE RANGE
              </h4>

              <div className="flex flex-col gap-0">
                {presets.map((p) => {
                  const active =
                    draft?.from?.toDateString() ===
                      p.getRange().from?.toDateString() &&
                    draft?.to?.toDateString() ===
                      p.getRange().to?.toDateString();

                  return (
                    <button
                      key={p.key}
                      onClick={() => {
                        const r = p.getRange();
                        if (r.to && r.to > maxSelectableDate)
                          r.to = maxSelectableDate;
                        setDraft(r);
                      }}
                      className={cn(
                        "flex items-center justify-between px-2 py-2 rounded-md hover:bg-accent/40 text-sm",
                        active && "bg-accent/20"
                      )}
                    >
                      <span>{p.label}</span>
                      <span className="text-[11px] bg-muted/10 px-2 py-0.5 rounded text-muted-foreground">
                        {p.key}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* ---------------------- RIGHT: CALENDAR ---------------------- */}
            <div className="p-1 w-[260px] py-0">
              <Calendar
                mode="range"
                selected={draft}
                onSelect={(range) => {
                  if (!range) return;

                  if (range.to && range.to > maxSelectableDate)
                    range.to = maxSelectableDate;
                  if (range.from && range.from > maxSelectableDate)
                    range.from = maxSelectableDate;

                  setDraft(range);
                }}
                month={month}
                onMonthChange={setMonth}
                disabled={disableFuture}
                numberOfMonths={1}
              />
            </div>
          </div>
          {/* ---------------------- CUSTOM RANGE + BUTTONS ---------------------- */}
          <div className="pl-4 pr-2 py-2 border-t">
            <h4 className="text-xs font-semibold text-muted-foreground tracking-wider">
              CUSTOM RANGE
            </h4>

            <div className="flex justify-between items-end mt-2 gap-2">
              {/* Inputs */}
              <div className="grid grid-cols-2 gap-1">
                {/* Start */}
                <div>
                  <Label className="text-xs">Start</Label>
                  <Input
                    type="date"
                    value={toDateInput(draft?.from)}
                    onChange={(e) => {
                      const d = e.target.value
                        ? new Date(`${e.target.value}T00:00:00`)
                        : undefined;

                      if (d && d > maxSelectableDate) return;

                      setDraft({
                        from: d,
                        to: draft?.to,
                      });
                    }}
                  />
                </div>

                {/* End */}
                <div>
                  <Label className="text-xs">End</Label>
                  <Input
                    type="date"
                    value={toDateInput(draft?.to)}
                    onChange={(e) => {
                      const d = e.target.value
                        ? new Date(`${e.target.value}T00:00:00`)
                        : undefined;

                      if (d && d > maxSelectableDate) return;

                      setDraft({
                        from: draft?.from,
                        to: d,
                      });
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDraft(committed);
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    setCommitted(draft);
                    setOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
