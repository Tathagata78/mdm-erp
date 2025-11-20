// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useQueryState } from "nuqs";
// import ReactECharts from "echarts-for-react";
// type BrushSelectedEventParams = {
//   batch: Array<{
//     selected: Array<{
//       dataIndex: number[] | number;
//     }>;
//   }>;
// };
// import type { EChartsOption } from "echarts";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { Card, CardContent } from "@workspace/ui/components/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@workspace/ui/components/table";

// /**
//  * Fully-featured sync component (TypeScript)
//  * - TanStack Table with infinite loading
//  * - ECharts (bar + line) synced
//  * - Brush range selection + click selection
//  * - Server-side filtering (fetches pages from /api/data)
//  * - URL sync via nuqs
//  */

// type DataType = {
//   id: string;
//   month: string;
//   value: number;
// };

// type ApiResponse = {
//   items: DataType[];
//   nextPage: number | null;
// };

// const PAGE_SIZE = 20;

// export default function AdvancedChartTableSync() {
//   // nuqs keeps the currently selected months in the URL and persists range mode
//   const [selected, setSelected] = useQueryState("selected", {
//     defaultValue: "",
//   });
//   const [rangeMode, setRangeMode] = useQueryState("rangeMode", {
//     defaultValue: "true",
//   });

//   // internal state for loaded data (infinite)
//   const [data, setData] = useState<DataType[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [nextPage, setNextPage] = useState<number | null>(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // derived list
//   const selectedList = useMemo(
//     () => (selected ? selected.split(",").filter(Boolean) : []),
//     [selected]
//   );

//   // fetcher implements server-side filtering + paging
//   const fetchPage = async (pageToLoad: number, replace = false) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams();
//       params.set("page", String(pageToLoad));
//       params.set("pageSize", String(PAGE_SIZE));
//       if (selectedList.length) params.set("months", selectedList.join(","));

//       const res = await fetch(`/api/data?${params.toString()}`);
//       if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
//       const json: ApiResponse = await res.json();

//       setData((prev) => (replace ? json.items : [...prev, ...json.items]));
//       setNextPage(json.nextPage);
//       setPage(pageToLoad);
//     } catch (err: any) {
//       setError(err?.message ?? String(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // initial load & reload on selection change
//   useEffect(() => {
//     // when selected filters change, reload from page 1
//     fetchPage(1, true);
//   }, [selected]);

//   // load more helper
//   const loadMore = () => {
//     if (nextPage) fetchPage(nextPage);
//   };

//   // Columns for TanStack table
//   const columns: ColumnDef<DataType>[] = useMemo(
//     () => [
//       { accessorKey: "month", header: "Month" },
//       { accessorKey: "value", header: "Value" },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   // Selection helpers
//   const toggleMonth = (m: string) => {
//     const exists = selectedList.includes(m);
//     const next = exists
//       ? selectedList.filter((x) => x !== m)
//       : [...selectedList, m];
//     setSelected(next.join(","));
//   };

//   const setSelectedRange = (months: string[]) => {
//     setSelected(months.join(","));
//   };

//   // Build chart option used by both charts (shared data, different series types)
//   const chartBase = useMemo((): { categories: string[]; values: number[] } => {
//     // Use server-loaded data if present else fall back to a month-ordered aggregated view
//     if (data.length) {
//       return {
//         categories: data.map((d) => d.month),
//         values: data.map((d) => d.value),
//       };
//     }

//     // fallback: 12 months placeholder
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     return {
//       categories: months,
//       values: months.map((_, i) => Math.round(100 + Math.random() * 150)),
//     };
//   }, [data]);

//   // ECharts options for bar chart
//   const barOption: EChartsOption = useMemo(() => {
//     return {
//       tooltip: { trigger: "axis" },
//       brush: {
//         toolbox: ["rect", "clear"],
//         xAxisIndex: "all",
//       },
//       xAxis: { type: "category", data: chartBase.categories },
//       yAxis: { type: "value" },
//       series: [
//         {
//           type: "bar",
//           data: chartBase.values,
//           itemStyle: {
//             color: (params: { dataIndex: number }) => {
//               const m = chartBase.categories[params.dataIndex] ?? "";
//               return selectedList.includes(m) ? "#4f46e5" : "#9ca3af";
//             },
//           },
//         },
//       ],
//     };
//   }, [chartBase, selectedList]);

//   // ECharts options for line chart (synced to same selection)
//   const lineOption: EChartsOption = useMemo(() => {
//     return {
//       tooltip: { trigger: "axis" },
//       brush: { toolbox: ["rect", "clear"], xAxisIndex: "all" },
//       xAxis: { type: "category", data: chartBase.categories },
//       yAxis: { type: "value" },
//       series: [
//         {
//           type: "line",
//           data: chartBase.values,
//           smooth: true,
//           lineStyle: { width: 2 },
//           itemStyle: {
//             color: (params: any) => {
//               const m = chartBase.categories[params.dataIndex];
//               return selectedList.includes(m ?? "") ? "#ea580c" : "#94a3b8";
//             },
//           },
//         },
//       ],
//     };
//   }, [chartBase, selectedList]);

//   // Handle brush selection event (for range selection)
//   const onBrushSelected = (params: BrushSelectedEventParams) => {
//     try {
//       const brushed = params.batch?.[0]?.selected?.[0]?.dataIndex ?? [];
//       // dataIndex could be an array of indices or a single index
//       const indexes = Array.isArray(brushed) ? brushed : [brushed];
//       const months = indexes
//         .map((i) => chartBase.categories[i])
//         .filter(Boolean);
//       if (months.length) setSelectedRange(months.filter((m): m is string => m !== undefined));
//     } catch (err) {
//       // ignore malformed events
//     }
//   };

//   // Chart event map for both charts
//   const chartEvents = {
//     brushSelected: onBrushSelected,
//     click: (params: any) => {
//       const m = chartBase.categories[params.dataIndex];
//       if (m) toggleMonth(m);
//     },
//   };

//   // Infinite loader sentinel
//   const sentinelRef = useRef<HTMLDivElement | null>(null);
//   useEffect(() => {
//     if (!sentinelRef.current) return;
//     const obs = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting && nextPage && !loading) {
//           loadMore();
//         }
//       });
//     });
//     obs.observe(sentinelRef.current);
//     return () => obs.disconnect();
//   }, [sentinelRef.current, nextPage, loading]);

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
//       {/* Charts column (two stacked charts) */}
//       <div className="lg:col-span-2 space-y-4">
//         <Card>
//           <CardContent>
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-lg font-semibold">Bar Chart</h3>
//               <div>
//                 <label className="mr-2">Range mode</label>
//                 <input
//                   type="checkbox"
//                   checked={rangeMode === "true"}
//                   onChange={(e) => setRangeMode(String(e.target.checked))}
//                 />
//               </div>
//             </div>
//             <ReactECharts
//               option={barOption}
//               onEvents={chartEvents}
//               style={{ height: 300 }}
//             />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent>
//             <h3 className="text-lg font-semibold mb-2">Line Chart (synced)</h3>
//             <ReactECharts
//               option={lineOption}
//               onEvents={chartEvents}
//               style={{ height: 260 }}
//             />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Table + controls column */}
//       <div>
//         <Card>
//           <CardContent>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-semibold">Data Table</h3>
//               <div className="flex gap-2">
//                 <button
//                   className="px-3 py-1 rounded border"
//                   onClick={() => {
//                     setSelected("");
//                     fetchPage(1, true);
//                   }}
//                 >
//                   Clear
//                 </button>
//                 <button
//                   className="px-3 py-1 rounded border"
//                   onClick={() => fetchPage(1, true)}
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>

//             <Table>
//               <TableHeader>
//                 {table.getHeaderGroups().map((hg) => (
//                   <TableRow key={hg.id}>
//                     {hg.headers.map((h) => (
//                       <TableHead key={h.id}>
//                         {flexRender(h.column.columnDef.header, h.getContext())}
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableHeader>

//               <TableBody>
//                 {table.getRowModel().rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     onClick={() => toggleMonth(row.original.month)}
//                     className={
//                       selectedList.includes(row.original.month)
//                         ? "bg-primary/20 cursor-pointer"
//                         : "cursor-pointer"
//                     }
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             <div className="mt-3 flex flex-col gap-2">
//               {loading && <div>Loading...</div>}
//               {error && <div className="text-red-500">{error}</div>}
//               <div ref={sentinelRef as any} />
//               {!nextPage && (
//                 <div className="text-sm text-muted-foreground">
//                   No more data
//                 </div>
//               )}
//               {nextPage && (
//                 <button
//                   className="px-3 py-1 rounded border mt-2"
//                   onClick={() => loadMore()}
//                   disabled={loading}
//                 >
//                   Load more
//                 </button>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQueryState } from "nuqs";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

// --- 1. Updated Types for your specific data structure ---
type DataType = {
  id: string;
  country: string;
  grade: string;
  lob: string; // Line of Business
  gbpPerDay: number;
  usdPerDay: number;
};

type BrushSelectedEventParams = {
  batch: Array<{
    selected: Array<{
      dataIndex: number[] | number;
    }>;
  }>;
};

type ApiResponse = {
  items: DataType[];
  nextPage: number | null;
};

const PAGE_SIZE = 20;

export default function FinancialDashboardSync() {
  // --- State Management ---

  // Filter state synced with URL
  const [selected, setSelected] = useQueryState("country", {
    defaultValue: "",
  });
  const [rangeMode, setRangeMode] = useQueryState("rangeMode", {
    defaultValue: "true",
  });

  // Data state
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derived list for filtering
  const selectedList = useMemo(
    () => (selected ? selected.split(",").filter(Boolean) : []),
    [selected]
  );

  // --- Mock Data Generator (Replace with your actual API fetch) ---
  const fetchPage = async (pageToLoad: number, replace = false) => {
    setLoading(true);
    setError(null);
    try {
      // SIMULATED API CALL
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generates mock data based on your structure
      const mockCountries = ["India", "United Kingdom", "USA", "Germany", "France", "Japan"];
      const mockGrades = ["T1", "T2", "T3", "T4"];
      const mockLOB = ["CEIT", "BFS", "Retail", "Health"];

      const newItems: DataType[] = Array.from({ length: PAGE_SIZE }).map((_, i) => {
        const country = mockCountries[Math.floor(Math.random() * mockCountries.length)];
        return {
          id: Math.random().toString(36).substr(2, 9),
          country: country,
          grade: mockGrades[Math.floor(Math.random() * mockGrades.length)],
          lob: mockLOB[Math.floor(Math.random() * mockLOB.length)],
          // Randomize values slightly based on country to make chart look realistic
          gbpPerDay: parseFloat((Math.random() * 100 + (country === "UK" ? 100 : 20)).toFixed(2)),
          usdPerDay: parseFloat((Math.random() * 120 + (country === "USA" ? 100 : 20)).toFixed(2)),
        };
      });

      // Filter logic simulation (Server-side filtering)
      const filteredItems = selectedList.length
        ? newItems.filter(item => selectedList.includes(item.country))
        : newItems;

      setData((prev) => (replace ? filteredItems : [...prev, ...filteredItems]));
      setNextPage(pageToLoad + 1); // Infinite scroll simulation
      setPage(pageToLoad);

    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  // Initial Load & Sync
  useEffect(() => {
    fetchPage(1, true);
  }, [selected]);

  const loadMore = () => {
    if (nextPage) fetchPage(nextPage);
  };

  // --- Table Columns Configuration ---
  const columns: ColumnDef<DataType>[] = useMemo(
    () => [
      { accessorKey: "country", header: "Country" },
      { accessorKey: "grade", header: "Grade" },
      { accessorKey: "lob", header: "LOB" },
      {
        accessorKey: "gbpPerDay",
        header: "GBP / Day",
        cell: ({ row }) => `£${row.original.gbpPerDay.toFixed(2)}`
      },
      {
        accessorKey: "usdPerDay",
        header: "USD / Day",
        cell: ({ row }) => `$${row.original.usdPerDay.toFixed(2)}`
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // --- Selection Helpers ---
  const toggleSelection = (val: string) => {
    const exists = selectedList.includes(val);
    const next = exists
      ? selectedList.filter((x) => x !== val)
      : [...selectedList, val];
    setSelected(next.join(","));
  };

  const setSelectedRange = (vals: string[]) => {
    setSelected(vals.join(","));
  };

  // --- Chart Data Aggregation ---
  // We aggregate data by Country so the chart shows 1 bar per country, even if table has 50 rows
  const chartBase = useMemo(() => {
    if (!data.length) return { categories: [], gbpValues: [], usdValues: [] };

    // Group by Country and Sum Values
    const grouped = data.reduce((acc, curr) => {
      if (!acc[curr.country]) {
        acc[curr.country] = { gbp: 0, usd: 0, count: 0 };
      }
      acc[curr.country].gbp += curr.gbpPerDay;
      acc[curr.country].usd += curr.usdPerDay;
      acc[curr.country].count += 1;
      return acc;
    }, {} as Record<string, { gbp: number; usd: number; count: number }>);

    const categories = Object.keys(grouped);
    // Round to 2 decimal places
    const gbpValues = categories.map(c => parseFloat(grouped[c].gbp.toFixed(2)));
    const usdValues = categories.map(c => parseFloat(grouped[c].usd.toFixed(2)));

    return { categories, gbpValues, usdValues };
  }, [data]);

  // --- ECharts Options ---

  const sharedBrush = {
    toolbox: ["rect", "clear"],
    xAxisIndex: "all",
  };

  const barOption: EChartsOption = useMemo(() => ({
    title: { text: 'Total GBP per Country', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: "axis" },
    brush: sharedBrush,
    xAxis: { type: "category", data: chartBase.categories },
    yAxis: { type: "value", name: "GBP" },
    series: [
      {
        type: "bar",
        data: chartBase.gbpValues,
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const c = chartBase.categories[params.dataIndex] ?? "";
            return selectedList.includes(c) ? "#4f46e5" : "#9ca3af"; // Active vs Inactive color
          },
        },
      },
    ],
  }), [chartBase, selectedList]);

  const lineOption: EChartsOption = useMemo(() => ({
    title: { text: 'Total USD per Country', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: "axis" },
    brush: sharedBrush,
    xAxis: { type: "category", data: chartBase.categories },
    yAxis: { type: "value", name: "USD" },
    series: [
      {
        type: "line",
        data: chartBase.usdValues,
        smooth: true,
        lineStyle: { width: 3 },
        itemStyle: {
          color: (params: any) => {
            const c = chartBase.categories[params.dataIndex];
            return selectedList.includes(c ?? "") ? "#ea580c" : "#94a3b8";
          },
        },
      },
    ],
  }), [chartBase, selectedList]);

  // --- Event Handlers ---

  const onBrushSelected = (params: BrushSelectedEventParams) => {
    try {
      const brushed = params.batch?.[0]?.selected?.[0]?.dataIndex ?? [];
      const indexes = Array.isArray(brushed) ? brushed : [brushed];
      const countries = indexes
        .map((i) => chartBase.categories[i])
        .filter(Boolean);

      if (countries.length > 0) {
        setSelectedRange(countries as string[]);
      } else {
        // Optional: Clear selection if brush is empty
        // setSelected(""); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  const chartEvents = {
    brushSelected: onBrushSelected,
    click: (params: any) => {
      const c = chartBase.categories[params.dataIndex];
      if (c) toggleSelection(c);
    },
  };

  // --- Intersection Observer for Infinite Scroll ---
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && nextPage && !loading) {
          loadMore();
        }
      });
    });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [nextPage, loading]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* Charts Column */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Financial Overview</h3>
              <div className="text-sm text-muted-foreground">
                Click bars or drag to filter table
              </div>
            </div>
            <ReactECharts
              option={barOption}
              onEvents={chartEvents}
              style={{ height: 300 }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <ReactECharts
              option={lineOption}
              onEvents={chartEvents}
              style={{ height: 260 }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Table Column */}
      <div>
        <Card className="h-full">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Details</h3>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 text-xs rounded border hover:bg-accent"
                  onClick={() => { setSelected(""); fetchPage(1, true); }}
                >
                  Reset
                </button>
                <button
                  className="px-3 py-1 text-xs rounded border hover:bg-accent"
                  onClick={() => fetchPage(1, true)}
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id}>
                      {hg.headers.map((h) => (
                        <TableHead key={h.id} className="text-xs">
                          {flexRender(h.column.columnDef.header, h.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => toggleSelection(row.original.country)}
                      className={`text-xs ${selectedList.includes(row.original.country)
                        ? "bg-blue-50 dark:bg-blue-900/20 cursor-pointer"
                        : "cursor-pointer hover:bg-gray-50"
                        }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Infinite Scroll Footer */}
            <div className="mt-3 flex flex-col gap-2 items-center">
              {loading && <div className="text-xs text-muted-foreground">Loading data...</div>}
              {error && <div className="text-xs text-red-500">{error}</div>}

              <div ref={sentinelRef as any} className="h-4 w-full" />

              {!nextPage && !loading && (
                <div className="text-xs text-muted-foreground">End of list</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}