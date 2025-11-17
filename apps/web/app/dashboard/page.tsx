import AdvancedFilter from "./_components/advanced-filter";
import DateRangePicker from "./_components/date-range-picker";
import DataTableWithExport from "./_components/data-table";
import MultiCards from "@/components/multi-cards";
import { OverviewCards } from "./_components/overview-card";
import { InsightCards } from "./_components/insight-cards";
import { LeadsCardModal } from "./_components/expandcard";
import AdvancedChartTableSync from "./_components/table";
const leadsChartConfig = {}; // Define leadsChartConfig with appropriate values
const leadsChartData: Array<Record<string, any>> = []; // Initialize as an empty array or populate with appropriate data
const lastMonth = ""; // Define lastMonth with appropriate value

function page() {
  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="lg:px-4 flex items-center justify-between gap-2">
            <DateRangePicker />
            <AdvancedFilter />
          </div>
          <OverviewCards />
          <InsightCards />
          {/* <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} /> */}

          {/* <div className="grid grid-cols-6 grid-rows-8 gap-2">
            <div className="col-span-2 row-span-3 aspect-auto bg-accent">
              <MultiCards />
            </div>
            <div className="col-span-2 row-span-3 col-start-1 row-start-4 aspect- bg-accent">
              2
            </div>
            <div className="col-span-2 row-span-2 col-start-1 row-start-7 aspect-auto bg-accent">
              3
            </div>
            <div className="col-span-2 row-span-2 col-start-3 row-start-1 aspect-auto bg-accent">
              4
            </div>
            <div className="col-span-2 row-span-2 col-start-5 row-start-1 aspect-auto bg-accent">
              5
            </div>
            <div className="col-span-4 row-span-4 col-start-3 row-start-5  aspect-video bg-accent">
              <DataTableWithExport />
            </div>
            <div className="col-span-2 row-span-2 col-start-3 row-start-3 aspect-auto bg-accent">
              7
            </div>
            <div className="col-span-2 row-span-2 col-start-5 row-start-3 aspect-auto bg-accent">
              8
            </div>
          </div> */}
          <AdvancedChartTableSync />
          <div className="grid grid-cols-1 gap-2 *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-5">
            <div className="aspect-video col-span-1 xl:col-span-2 bg-accent-foreground">
              <MultiCards />
            </div>
            <div className="aspect-auto col-span-1 xl:col-span-3">
              <DataTableWithExport />
            </div>
          </div>
          <LeadsCardModal
            leadsChartConfig={leadsChartConfig}
            leadsChartData={leadsChartData}
            lastMonth={lastMonth}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
