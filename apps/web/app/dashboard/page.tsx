import AdvancedFilter from "./_components/advanced-filter";
import DateRangePicker from "./_components/date-range-picker";
import DataTableWithExport from "./_components/data-table";
function page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className=" mx-6 lg:px-6 flex items-center justify-between gap-4">
            <DateRangePicker />
            <AdvancedFilter />
          </div>
          {/* <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} /> */}
          {/* <div className="grid grid-cols-6 grid-rows-8 gap-2">
            <div className="col-span-2 row-span-3 aspect-auto bg-accent">
              1
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
              6
            </div>
            <div className="col-span-2 row-span-2 col-start-3 row-start-3 aspect-auto bg-accent">
              7
            </div>
            <div className="col-span-2 row-span-2 col-start-5 row-start-3 aspect-auto bg-accent">
              8
            </div>
          </div> */}
          {/* <ChartTableSync /> */}
            <DataTableWithExport />
        </div>

      </div>
    </div>
  );
}

export default page;
