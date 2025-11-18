// import React from 'react'
// import {
//   Sheet,
//   SheetTrigger,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetFooter,
//   SheetClose,
// } from "@workspace/ui/components/sheet";
// import {Button} from "@workspace/ui/components/button"
// import {Input} from "@workspace/ui/components/input"
// import {Label} from "@workspace/ui/components/label"
// function AdvancedFilter() {
//   return (
//     <div>
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button variant="outline">Filter</Button>
//         </SheetTrigger>
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle>Advanced Filter</SheetTitle>
//           </SheetHeader>
//           <div className="grid flex-1 auto-rows-min gap-6 px-4">
//             <div className="grid gap-3">
//               <Label htmlFor="sheet-demo-name">Name</Label>
//               <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="sheet-demo-username">Username</Label>
//               <Input id="sheet-demo-username" defaultValue="@peduarte" />
//             </div>
//           </div>
//           <SheetFooter>
//             <Button type="submit">Save changes</Button>
//             <SheetClose asChild>
//               <Button variant="outline">Close</Button>
//             </SheetClose>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

// export default AdvancedFilter

"use client";

import React from "react";
import {
  FilterIcon,
  ChevronsUpDown,
  Check,
  X,
  Sliders,
  CircleAlert,
  RotateCcw,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@workspace/ui/components/sheet";
import { Label } from "@workspace/ui/components/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@workspace/ui/components/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@workspace/ui/components/command";
import { cn } from "@workspace/ui/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { toast } from "sonner";

const locations = ["New York", "London", "Tokyo"];
const types = ["Type A", "Type B", "Type C"];
const territories = ["North", "South", "East", "West"];
const categories = ["Category 1", "Category 2", "Category 3"];
const grades = ["Grade 1", "Grade 2", "Grade 3"];
const accounts = ["Account 1", "Account 2", "Account 3"];
const seatings = ["Seating 1", "Seating 2", "Seating 3"];
const reportingManagers = ["Manager 1", "Manager 2", "Manager 3", "Manager 4"];
const statuses = ["Active", "Withdrawn"];

function GlobalFilter() {
  const [location, setLocation] = React.useState<string[]>([]);
  const [type, setType] = React.useState<string[]>([]);
  const [territory, setTerritory] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string[]>([]);
  const [grade, setGrade] = React.useState<string[]>([]);
  const [account, setAccount] = React.useState<string[]>([]);
  const [seating, setSeating] = React.useState<string[]>([]);
  const [reportingManager, setReportingManager] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<string[]>([]);

  const handleApplyFilters = () => {
    const selectedFilters = [
      { label: "Location", values: location },
      { label: "Type", values: type },
      { label: "Territory", values: territory },
      { label: "Category", values: category },
      { label: "Grade", values: grade },
      { label: "Account", values: account },
      { label: "Seating", values: seating },
      { label: "Reporting Manager", values: reportingManager },
      { label: "Status", values: status },
    ].filter((filter) => filter.values.length > 0);

    toast.dismiss();

    if (selectedFilters.length > 0) {
      toast.success("Your filters have been successfully applied", {
        style: {
          background: "#32CD32",
          color: "white",
        },
        icon: <Check className="w-4 h-4 text-white" />,
      });
    } else {
      toast.error("No Filters Selected", {
        style: {
          background: "#ffffff",
          color: "#292929",
        },
        icon: <CircleAlert className="w-4 h-4 text-gray-600" />,
      });
    }

    console.log("Applied Filters:", selectedFilters);
  };

  const handleResetFilters = () => {
    setLocation([]);
    setType([]);
    setTerritory([]);
    setCategory([]);
    setGrade([]);
    setAccount([]);
    setSeating([]);
    setReportingManager([]);
    setStatus([]);
  };

  const handleRemoveFilter = (filterLabel: string, value: string) => {
    switch (filterLabel) {
      case "Location":
        setLocation((prev) => prev.filter((v) => v !== value));
        break;
      case "Type":
        setType((prev) => prev.filter((v) => v !== value));
        break;
      case "Territory":
        setTerritory((prev) => prev.filter((v) => v !== value));
        break;
      case "Category":
        setCategory((prev) => prev.filter((v) => v !== value));
        break;
      case "Grade":
        setGrade((prev) => prev.filter((v) => v !== value));
        break;
      case "Account":
        setAccount((prev) => prev.filter((v) => v !== value));
        break;
      case "Seating":
        setSeating((prev) => prev.filter((v) => v !== value));
        break;
      case "Reporting Manager":
        setReportingManager((prev) => prev.filter((v) => v !== value));
        break;
      case "Status":
        setStatus((prev) => prev.filter((v) => v !== value));
        break;
      default:
        break;
    }
  };

  const SelectedFiltersTable = () => {
    const filters = [
      { label: "Location", values: location },
      { label: "Type", values: type },
      { label: "Territory", values: territory },
      { label: "Category", values: category },
      { label: "Grade", values: grade },
      { label: "Account", values: account },
      { label: "Seating", values: seating },
      { label: "Reporting Manager", values: reportingManager },
      { label: "Status", values: status },
    ].filter((filter) => filter.values.length > 0);

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-3 border-b">
          <div className="text-xs font-medium flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            Applied Filters
          </div>
        </div>
        {filters.length === 0 ? (
          <div className="p-4 text-muted-foreground text-xs text-center">
            No filters applied
          </div>
        ) : (
          <Table className="bg-background">
            <TableHeader className="bg-muted/30">
              <TableRow className="divide-x divide-muted-foreground/30">
                <TableHead className="px-3 text-xs font-semibold">
                  Category
                </TableHead>
                <TableHead className="px-4 text-xs font-semibold">
                  Selections
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filters.map((filter) => (
                <TableRow
                  key={filter.label}
                  className="hover:bg-muted/10 divide-x divide-muted-foreground/30"
                >
                  <TableCell className="px-3 py-2 font-medium text-xs text-muted-foreground">
                    {filter.label}
                  </TableCell>
                  <TableCell className="px-3 py-2 text-xs">
                    <div className="flex flex-wrap gap-3">
                      {filter.values.map((v) => (
                        <div key={v} className="relative inline-block">
                          <Badge variant="outline" className="text-xs pr-2">
                            {v}
                          </Badge>
                          <button
                            type="button"
                            onClick={() => handleRemoveFilter(filter.label, v)}
                            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 border rounded-full p-[2px] cursor-pointer focus:outline-none z-10 hover:bg-red-50 bg-muted"
                          >
                            <X className="h-2 w-2 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  };

  const Combobox = ({
    label,
    values,
    options,
    onSelect,
  }: {
    label: string;
    values: string[];
    options: string[];
    onSelect: (value: string) => void;
  }) => (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between text-xs h-8"
          >
            <div className="flex items-center gap-1">
              {values.length > 0 ? (
                <>
                  <span className="text-muted-foreground">
                    {values.length} selected
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">
                  Select options ...
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-3 w-3 opacity-70 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-h-60 shadow-lg">
          <Command className="h-full">
            <CommandInput placeholder="Search" className="h-8 text-xs" />
            <CommandEmpty className="text-xs p-2 text-center text-muted-foreground">
              No options found
            </CommandEmpty>
            <CommandGroup className="overflow-y-auto">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => onSelect(option)}
                  className="text-xs aria-selected:bg-primary/5 hover:bg-muted/10 p-1"
                >
                  <Check
                    className={cn(
                      "mr-2 h-3 w-3 shrink-0 text-primary",
                      values.includes(option) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="text-xs gap-2 cursor-pointer">
            <FilterIcon className="h-3.5 w-3.5" />
            <span className="capitalize">Advanced Filters</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col text-xs">
          <SheetHeader className="border-b pb-3">
            <div className="flex flex-col gap-1">
              <SheetTitle className="text-lg font-semibold flex items-center gap-2">
                Advanced Filters
              </SheetTitle>
              {/* <span className="text-xs text-muted-foreground italic">
                Refine your search using multiple filters
              </span> */}
            </div>
          </SheetHeader>
          <div className="px-4 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              <Combobox
                label="Location"
                values={location}
                options={locations}
                onSelect={(value) =>
                  setLocation((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  )
                }
              />
              <Combobox
                label="Type"
                values={type}
                options={types}
                onSelect={(value) =>
                  setType((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  )
                }
              />
              <Combobox
                label="Territory"
                values={territory}
                options={territories}
                onSelect={(value) =>
                  setTerritory((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  )
                }
              />
              <Combobox
                label="Category"
                values={category}
                options={categories}
                onSelect={(value) =>
                  setCategory((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  )
                }
              />
              <Combobox
                label="Grade"
                values={grade}
                options={grades}
                onSelect={(value) =>
                  setGrade((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  )
                }
              />
              <Combobox
                label="Account"
                values={account}
                options={accounts}
                onSelect={(value) =>
                  setAccount((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  )
                }
              />
              <Combobox
                label="Seating"
                values={seating}
                options={seatings}
                onSelect={(value) =>
                  setSeating((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  )
                }
              />
              <Combobox
                label="Status"
                values={status}
                options={statuses}
                onSelect={(value) =>
                  setStatus((prev) =>
                    prev.includes(value)
                      ? prev.filter((v) => v !== value)
                      : [...prev, value]
                  )
                }
              />
              <div className="col-span-2">
                <Combobox
                  label="Reporting Manager"
                  values={reportingManager}
                  options={reportingManagers}
                  onSelect={(value) =>
                    setReportingManager((prev) =>
                      prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                    )
                  }
                />
              </div>
            </div>
            <div className="pt-4">
              <SelectedFiltersTable />
            </div>
          </div>

          <SheetFooter className="flex flex-col gap-2 px-4 pb-4 border-t pt-2">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="w-1/2 text-xs h-8 gap-1 cursor-pointer"
                onClick={handleResetFilters}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset All
              </Button>
              <SheetClose asChild>
                <Button
                  className="w-1/2 text-xs h-8 gap-1 cursor-pointer"
                  onClick={handleApplyFilters}
                >
                  <Check className="h-3.5 w-3.5" />
                  Apply Filters
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default GlobalFilter;